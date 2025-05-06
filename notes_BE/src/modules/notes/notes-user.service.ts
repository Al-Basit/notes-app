import { 
    Injectable, 
    NotFoundException, 
    BadRequestException, 
    ForbiddenException 
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { ShareNoteDto } from './dto/share-note.dto';
  import { NotificationsService } from '../notifications/notifications.service';
  import { NotificationType, Visibility } from '@prisma/client';
  
  @Injectable()
  export class NoteUserService {
    constructor(
      private readonly prisma: PrismaService,
      private readonly notificationsService: NotificationsService,
    ) {}
  
    async shareNote(noteId: string, shareNoteDto: ShareNoteDto, ownerId: string) {
      const { userIds, canEdit = false } = shareNoteDto;
  
      // Check if note exists and belongs to the owner
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${noteId} not found`);
      }
  
      if (note.author_id !== ownerId) {
        throw new ForbiddenException('Only the note owner can share the note');
      }
  
      // Update note visibility to LIMITED if it's not already
      if (note.visibility !== Visibility.LIMITED) {
        await this.prisma.note.update({
          where: { id: noteId },
          data: { visibility: Visibility.LIMITED },
        });
      }
  
      // Share note with users in a transaction
      const result = await this.prisma.$transaction(async (prisma) => {
        const sharePromises = userIds.map(async (userId) => {
          // Don't share with the owner
          if (userId === ownerId) {
            return { userId, status: 'skipped', message: 'Cannot share with owner' };
          }
  
          // Check if user exists
          const user = await prisma.user.findUnique({ where: { id: userId } });
          if (!user) {
            return { userId, status: 'failed', message: 'User not found' };
          }
  
          try {
            // Check if share already exists
            const existingShare = await prisma.noteUser.findUnique({
              where: {
                note_id_user_id: {
                  note_id: noteId,
                  user_id: userId,
                },
              },
            });
  
            if (existingShare) {
              // Update existing share if needed
              if (existingShare.can_edit !== canEdit) {
                await prisma.noteUser.update({
                  where: {
                    id: existingShare.id,
                  },
                  data: {
                    can_edit: canEdit,
                  },
                });
                return { userId, status: 'updated', user: { id: user.id, email: user.email } };
              }
              return { userId, status: 'exists', user: { id: user.id, email: user.email } };
            }
  
            // Create new share
            await prisma.noteUser.create({
              data: {
                note: { connect: { id: noteId } },
                user: { connect: { id: userId } },
                can_edit: canEdit,
              },
            });
  
            // Create notification for shared user
            await prisma.notification.create({
              data: {
                message: `Note "${note.title}" has been shared with you`,
                type: NotificationType.SHARE_ADDED,
                user: { connect: { id: userId } },
                note: { connect: { id: noteId } },
              },
            });
  
            return { userId, status: 'shared', user: { id: user.id, email: user.email } };
          } catch (error) {
            return { userId, status: 'failed', message: 'Failed to share note' };
          }
        });
  
        return Promise.all(sharePromises);
      });
  
      // Send real-time notifications to the shared users
      for (const share of result) {
        if (share.status === 'shared') {
          this.notificationsService.emitShareAddedNotification(
            share.userId,
            noteId,
            note.title,
            canEdit,
          );
        }
      }
  
      return {
        noteId,
        shares: result,
      };
    }
  
    async removeSharedUser(noteId: string, userId: string) {
      // Check if share exists
      const share = await this.prisma.noteUser.findUnique({
        where: {
          note_id_user_id: {
            note_id: noteId,
            user_id: userId,
          },
        },
        include: {
          note: true,
        },
      });
  
      if (!share) {
        throw new NotFoundException(`Share not found for user ${userId} on note ${noteId}`);
      }
  
      // Delete the share
      await this.prisma.noteUser.delete({
        where: {
          note_id_user_id: {
            note_id: noteId,
            user_id: userId,
          },
        },
      });
  
      // Check if there are any remaining shares - if not, update visibility
      const remainingShares = await this.prisma.noteUser.count({
        where: { note_id: noteId },
      });
  
      if (remainingShares === 0 && share.note.visibility === Visibility.LIMITED) {
        // If no more shares, set back to private
        await this.prisma.note.update({
          where: { id: noteId },
          data: { visibility: Visibility.PRIVATE },
        });
      }
  
      // Create notification
      await this.prisma.notification.create({
        data: {
          message: `Your access to note "${share.note.title}" has been removed`,
          type: NotificationType.SHARE_ADDED, // Reusing the same type but with different message
          user: { connect: { id: userId } },
        },
      });
  
      // Emit real-time notification
      this.notificationsService.emitShareRemovedNotification(
        userId,
        noteId,
        share.note.title,
      );
  
      return { success: true };
    }
  
    async findSharedUsers(noteId: string) {
      // Check if note exists
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${noteId} not found`);
      }
  
      // Get all shared users for the note
      const sharedUsers = await this.prisma.noteUser.findMany({
        where: {
          note_id: noteId,
        },
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
              image_url: true,
            },
          },
        },
      });
  
      return sharedUsers.map(share => ({
        ...share.user,
        can_edit: share.can_edit,
      }));
    }
  
    async checkUserAccess(noteId: string, userId: string) {
      // Find note
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
        include: {
          shared_with: {
            where: { user_id: userId },
          },
        },
      });
  
      if (!note) {
        return false;
      }
  
      // User has access if they own the note
      if (note.author_id === userId) {
        return { access: true, ownership: true, canEdit: true };
      }
  
      // User has access if the note is public
      if (note.visibility === Visibility.PUBLIC) {
        return { access: true, ownership: false, canEdit: false };
      }
  
      // User has access if the note is shared with them
      const shared = note.shared_with.length > 0;
      if (shared) {
        const canEdit = note.shared_with[0].can_edit;
        return { access: true, ownership: false, canEdit };
      }
  
      return { access: false, ownership: false, canEdit: false };
    }
  }