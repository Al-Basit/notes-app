
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TagService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllTags() {
    // Try to get from cache first
    const cachedTags = await this.cacheManager.get('all_tags');
    
    if (cachedTags) {
      return cachedTags;
    }

    // Get all tags with note count
    const tags = await this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            notes: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const formattedTags = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      noteCount: tag._count.notes,
      created_at: tag.created_at,
    }));

    // Cache for 30 minutes
    await this.cacheManager.set('all_tags', formattedTags, 30 * 60 * 1000);

    return formattedTags;
  }

  async getTagsByNoteId(noteId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
      include: {
        tags: true,
      },
    });

    return note?.tags || [];
  }

  async addTagsToNote(noteId: string, tagNames: string[]) {
    // Invalidate tags cache
    await this.cacheManager.del('all_tags');

    // Connect or create tags for the note
    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        tags: {
          connectOrCreate: tagNames.map(name => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async removeTagFromNote(noteId: string, tagId: string) {
    // Invalidate tags cache
    await this.cacheManager.del('all_tags');

    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        tags: {
          disconnect: { id: tagId },
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async searchTags(query: string) {
    return this.prisma.tag.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 10, // Limit to 10 results
    });
  }

  async getPopularTags(limit: number = 10) {
    // Get the most used tags
    const tags = await this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            notes: true,
          },
        },
      },
      orderBy: {
        notes: {
          _count: 'desc',
        },
      },
      take: limit,
    });

    return tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      noteCount: tag._count.notes,
      created_at: tag.created_at,
    }));
  }

  async cleanupUnusedTags() {
    // Delete tags that aren't associated with any notes
    return this.prisma.tag.deleteMany({
      where: {
        notes: {
          none: {},
        },
      },
    });
  }
}