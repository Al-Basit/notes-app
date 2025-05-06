import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType, Prisma } from '@prisma/client';

@Injectable()
export class NoteVersionService {
  constructor(private readonly prisma: PrismaService) {}

  async createVersion(
    noteId: string, 
    title: string, 
    content: string, 
    userId: string,
    // Optional transaction parameter to allow this method to be used within transactions
    prismaClient?: Prisma.TransactionClient
  ) {
    const client = prismaClient || this.prisma;
    
    // Create a new version of the note
    const version = await client.noteVersion.create({
      data: {
        title,
        content,
        note: { connect: { id: noteId } },
        created_by: { connect: { id: userId } },
      },
      include: {
        created_by: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    // Create a notification about the new version
    if (!prismaClient) {
      // Only create notification if not part of another transaction
      await client.notification.create({
        data: {
          message: `A new version of note "${title}" was created`,
          type: NotificationType.VERSION_CREATED,
          user: { connect: { id: userId } },
          note: { connect: { id: noteId } },
        },
      });
    }

    return version;
  }

  async findAllVersions(noteId: string) {
    // Check if note exists
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    // Get all versions for the note, ordered by creation date
    const versions = await this.prisma.noteVersion.findMany({
      where: {
        note_id: noteId,
      },
      include: {
        created_by: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return versions;
  }

  async findVersion(noteId: string, versionId: string) {
    // Get specific version
    const version = await this.prisma.noteVersion.findUnique({
      where: {
        id: versionId,
      },
      include: {
        created_by: {
          select: {
            id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    if (!version || version.note_id !== noteId) {
      throw new NotFoundException('Version not found or does not belong to this note');
    }

    return version;
  }

  async deleteVersionsForNote(noteId: string, prismaClient?: Prisma.TransactionClient) {
    const client = prismaClient || this.prisma;
    
    // Delete all versions of a note
    return client.noteVersion.deleteMany({
      where: {
        note_id: noteId,
      },
    });
  }
}