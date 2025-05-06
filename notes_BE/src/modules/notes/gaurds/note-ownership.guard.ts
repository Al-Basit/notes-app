import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    NotFoundException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { PrismaService } from '../../prisma/prisma.service';
  import { Role, Visibility } from '@prisma/client';
  
  @Injectable()
  export class NoteOwnershipGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private prisma: PrismaService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      // If user is an admin, they can do anything
      if (user.role === Role.ADMIN) {
        return true;
      }
  
      const noteId = request.params.id;
      if (!noteId) {
        throw new NotFoundException('Note ID not found in request');
      }
  
      // Find note and check ownership/permissions
      const note = await this.prisma.note.findUnique({
        where: { id: noteId },
        include: {
          shared_with: {
            where: { user_id: user.id },
          },
        },
      });
  
      if (!note) {
        throw new NotFoundException(`Note with ID ${noteId} not found`);
      }
  
      // Check if the user is the owner
      if (note.author_id === user.id) {
        return true;
      }
  
      // If the note is publicly visible, allow read access
      if (note.visibility === Visibility.PUBLIC) {
        const method = request.method;
        if (method === 'GET') {
          return true;
        }
      }
  
      // Check if the note is shared with the user
      const isShared = note.shared_with.length > 0;
      
      if (isShared) {
        const method = request.method;
        const canEdit = note.shared_with[0].can_edit;
  
        // For read operations, just being shared is enough
        if (method === 'GET') {
          return true;
        }
  
        // For write operations, user needs edit permission
        if ((method === 'PATCH' || method === 'POST') && canEdit) {
          return true;
        }
      }
  
      throw new ForbiddenException('You do not have permission to access this note');
    }
  }