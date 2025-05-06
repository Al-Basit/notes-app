import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { CreateNoteDto } from './dto/create-note.dto';
  import { UpdateNoteDto } from './dto/update-note.dto';
  import { FilterNotesDto } from './dto/filter-notes.dto';
//   import { NotificationsService } from '../notifications/notifications.service';
  import { NoteVersionService } from './notes-version.service';
  import { Visibility, Role, NotificationType, Prisma } from '@prisma/client';
  
  @Injectable()
  export class NotesService {
    constructor(
      private readonly prisma: PrismaService,
    //   private readonly notificationsService: NotificationsService,
      private readonly noteVersionService: NoteVersionService,
    ) {}
  
    async create(createNoteDto: CreateNoteDto, userId: string) {
      const { tags = [], ...noteData } = createNoteDto;
  
      const result = await this.prisma.$transaction(async (prisma) => {
        const note = await prisma.note.create({
          data: {
            title: noteData.title,
            content: noteData.content,
            visibility: noteData.visibility || Visibility.PRIVATE,
            author: {
              connect: { id: userId },
            },
            tags: {
              connectOrCreate: tags.map(tag => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
          },
          include: {
            tags: true,
            author: {
              select: {
                id: true,
                full_name: true, 
                email: true
              }
            }
          },
        });
  
        await prisma.noteVersion.create({
          data: {
            title: note.title,
            content: note.content,
            note: { connect: { id: note.id } },
            created_by: { connect: { id: userId } },
          },
        });
  
        // await prisma.notification.create({
        //   data: {
        //     message: `Note "${note.title}" created successfully`,
        //     type: NotificationType.NOTE_CREATED,
        //     user: { connect: { id: userId } },
        //     note: { connect: { id: note.id } },
        //   },
        // });
  
        return note;
      });
  
    //   this.notificationsService.emitNoteCreatedNotification(userId, result);
      return result;
    }
  
    async findAll(userId: string, userRole: Role, filterDto: FilterNotesDto) {
      const {
        search,
        tag,
        visibility,
        authorId,
        isArchived,
      } = filterDto;
  
      const where: Prisma.NoteWhereInput = {};
  
      if (userRole !== Role.ADMIN) {
        where.OR = [
          { author_id: userId },
          { visibility: Visibility.PUBLIC },
          {
            shared_with: {
              some: {
                user_id: userId,
              },
            },
          },
        ];
      }
  
      if (search) {
        where.OR = [
          { title: { contains: search } },
          { content: { contains: search } },
        ];
      }
  
      if (tag) {
        where.tags = {
          some: {
            name: tag,
          },
        };
      }
  
      if (visibility) {
        where.visibility = visibility;
      }
  
      if (authorId) {
        where.author_id = authorId;
      }
  
      if (isArchived !== undefined) {
        where.is_archived = isArchived;
      }
  
      return this.prisma.note.findMany({
        where,
        include: {
          tags: true,
          author: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
          shared_with: {
            include: {
              user: {
                select: {
                  id: true,
                  full_name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          updated_at: 'desc',
        },
      });
    }
  
    async findOne(id: string, userId: string, userRole: Role) {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          tags: true,
          author: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
          shared_with: {
            include: {
              user: {
                select: {
                  id: true,
                  full_name: true,
                  email: true,
                },
              },
            },
          },
          attachments: true,
        },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
  
      if (
        userRole !== Role.ADMIN &&
        note.author_id !== userId &&
        note.visibility !== Visibility.PUBLIC &&
        !note.shared_with.some((shared) => shared.user_id === userId)
      ) {
        throw new ForbiddenException('You do not have access to this note');
      }
  
      return note;
    }
  
    async update(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          shared_with: true,
        },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
  
      if (note.is_archived && 
          (updateNoteDto.title !== undefined || updateNoteDto.content !== undefined)) {
        throw new BadRequestException('Cannot update content of an archived note');
      }
  
      const userHasEditAccess = note.author_id === userId || 
                              note.shared_with.some(s => s.user_id === userId && s.can_edit);
      
      if (!userHasEditAccess) {
        throw new ForbiddenException('You do not have permission to edit this note');
      }
  
      const { tags, ...updateData } = updateNoteDto;
  
      const updatedNote = await this.prisma.$transaction(async (prisma) => {
        if (updateData.title !== undefined || updateData.content !== undefined) {
          await this.noteVersionService.createVersion(
            id,
            note.title,
            note.content,
            userId,
            prisma,
          );
        }
  
        const updated = await prisma.note.update({
          where: { id },
          data: {
            ...updateData,
            ...(tags && {
              tags: {
                set: [],
                connectOrCreate: tags.map(tag => ({
                  where: { name: tag },
                  create: { name: tag },
                })),
              },
            }),
          },
          include: {
            tags: true,
            author: {
              select: {
                id: true,
                full_name: true,
                email: true,
              },
            },
          },
        });
  
        await prisma.notification.create({
          data: {
            message: `Note "${updated.title}" was updated`,
            type: NotificationType.NOTE_UPDATED,
            user: { connect: { id: note.author_id } },
            note: { connect: { id: id } },
          },
        });
  
        return updated;
      });
  
    //   this.notificationsService.emitNoteUpdatedNotification(note.author_id, updatedNote);
  
      if (note.shared_with && note.shared_with.length > 0) {
        for (const shared of note.shared_with) {
        //   this.notificationsService.emitNoteUpdatedNotification(shared.user_id, updatedNote);
        }
      }
  
      return updatedNote;
    }
  
    async remove(id: string, userId: string) {
      const note = await this.prisma.note.findUnique({
        where: { id },
        include: {
          shared_with: true,
        },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
  
      const sharedUserIds = note.shared_with.map(s => s.user_id);
  
      await this.prisma.notification.create({
        data: {
          message: `Note "${note.title}" was deleted`,
          type: NotificationType.NOTE_DELETED,
          user: { connect: { id: note.author_id } },
        },
      });
  
      await this.prisma.note.delete({
        where: { id },
      });
  
    //   this.notificationsService.emitNoteDeletedNotification(note.author_id, note.title);
      
      for (const sharedUserId of sharedUserIds) {
        // this.notificationsService.emitNoteDeletedNotification(sharedUserId, note.title);
      }
  
      return { success: true };
    }
  
    async updateArchiveStatus(id: string, archiveStatus: boolean, userId: string) {
      const note = await this.prisma.note.findUnique({
        where: { id },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
  
      const updatedNote = await this.prisma.note.update({
        where: { id },
        data: {
          is_archived: archiveStatus,
        },
        include: {
          tags: true,
          author: {
            select: {
              id: true,
              full_name: true,
              email: true,
            },
          },
        },
      });
  
      return updatedNote;
    }
  
    async restoreVersion(noteId: string, versionId: string, userId: string) {
      const version = await this.prisma.noteVersion.findUnique({
        where: { id: versionId },
        include: {
          note: true,
        },
      });
  
      if (!version || version.note_id !== noteId) {
        throw new NotFoundException('Version not found or does not belong to this note');
      }
  
      const note = version.note;
  
      if (note.is_archived) {
        throw new BadRequestException('Cannot restore versions of an archived note');
      }
  
      const restoredNote = await this.prisma.$transaction(async (prisma) => {
        await this.noteVersionService.createVersion(
          noteId,
          note.title,
          note.content,
          userId,
          prisma,
        );
  
        const updated = await prisma.note.update({
          where: { id: noteId },
          data: {
            title: version.title,
            content: version.content,
            updated_at: new Date(),
          },
          include: {
            tags: true,
            author: {
              select: {
                id: true,
                full_name: true,
                email: true,
              },
            },
          },
        });
  
        await prisma.notification.create({
          data: {
            message: `Note "${updated.title}" restored to a previous version`,
            type: NotificationType.VERSION_CREATED,
            user: { connect: { id: note.author_id } },
            note: { connect: { id: noteId } },
          },
        });
  
        return updated;
      });
  
    //   this.notificationsService.emitVersionRestoredNotification(note.author_id, restoredNote, versionId);
  
      return restoredNote;
    }
  
    async checkEditPermission(noteId: string, userId: string) {
      const note = await this.prisma.note.findUnique({
        where: { noteId },
        include: {
          shared_with: {
            where: { user_id: userId },
            select: { can_edit: true },
          },
        },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${noteId} not found`);
      }
  
      const isAuthor = note.author_id === userId;
      const hasEditPermission = note.shared_with.length > 0 && note.shared_with[0].can_edit;
  
      return isAuthor || hasEditPermission;
    }
  }