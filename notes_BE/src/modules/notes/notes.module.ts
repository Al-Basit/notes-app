import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotesController } from './notes.controller';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule
  ],
  controllers: [NotesController],
  providers: [
    NotesService,
    NoteVersionService,
    NoteUserService,
    TagService
  ],
  exports: [
    NotesService,
    NoteVersionService,
    NoteUserService,
    TagService
  ],
})
export class NotesModule {}