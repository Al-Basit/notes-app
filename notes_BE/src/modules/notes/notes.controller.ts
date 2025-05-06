import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
  HttpCode,
  UseFilters,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteVersionService } from './notes-version.service';
import { NoteUserService } from './notes-user.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ShareNoteDto } from './dto/share-note-dto';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { RestoreVersionDto } from './dto/restore-version.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { NoteOwnershipGuard } from './gaurds/note-ownership.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/app.gaurd';

@ApiTags('notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(AuthGuard, RolesGuard)
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly noteVersionService: NoteVersionService,
    private readonly noteUserService: NoteUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'Note created successfully' })
  // @Throttle({ default: { limit: 5, ttl: 60000 } }) // Limit to 5 note creations per minute
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    return this.notesService.create(createNoteDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes the user has access to' })
  @ApiResponse({ status: 200, description: 'Returns all accessible notes' })
  // @UseInterceptors(CacheInterceptor)
  async findAll(@Query() filterDto: FilterNotesDto, @Req() req) {
    return this.notesService.findAll(req.user.id, req.user.role, filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note by ID' })
  @ApiResponse({ status: 200, description: 'Returns the note if accessible' })
  @ApiResponse({ status: 404, description: 'Note not found or not accessible' })
  // @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.notesService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({ status: 200, description: 'Note updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  @UseGuards(NoteOwnershipGuard)
  // @Throttle({ default: { limit: 10, ttl: 60000 } }) // Limit to 10 note updates per minute
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ) {
    return this.notesService.update(id, updateNoteDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({ status: 204, description: 'Note deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - user does not have permission' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(NoteOwnershipGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.notesService.remove(id, req.user.id);
  }

  @Post(':id/archive')
  @ApiOperation({ summary: 'Archive a note' })
  @ApiResponse({ status: 200, description: 'Note archived successfully' })
  @UseGuards(NoteOwnershipGuard)
  async archiveNote(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.notesService.updateArchiveStatus(id, true, req.user.id);
  }

  @Post(':id/unarchive')
  @ApiOperation({ summary: 'Unarchive a note' })
  @ApiResponse({ status: 200, description: 'Note unarchived successfully' })
  @UseGuards(NoteOwnershipGuard)
  async unarchiveNote(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    return this.notesService.updateArchiveStatus(id, false, req.user.id);
  }

  @Post(':id/share')
  @ApiOperation({ summary: 'Share a note with other users' })
  @ApiResponse({ status: 200, description: 'Note shared successfully' })
  @UseGuards(NoteOwnershipGuard)
  async shareNote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() shareNoteDto: ShareNoteDto,
    @Req() req,
  ) {
    return this.noteUserService.shareNote(id, shareNoteDto, req.user.id);
  }

  @Delete(':id/share/:userId')
  @ApiOperation({ summary: 'Remove a user from shared note' })
  @ApiResponse({ status: 204, description: 'User removed from shared note successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(NoteOwnershipGuard)
  async removeSharedUser(
    @Param('id', ParseUUIDPipe) noteId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req,
  ) {
    return this.noteUserService.removeSharedUser(noteId, userId);
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'Get all versions of a note' })
  @ApiResponse({ status: 200, description: 'Returns all versions of the note' })
  @UseGuards(NoteOwnershipGuard)
  async getNoteVersions(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteVersionService.findAllVersions(id);
  }

  @Get(':id/versions/:versionId')
  @ApiOperation({ summary: 'Get a specific version of a note' })
  @ApiResponse({ status: 200, description: 'Returns the specific note version' })
  @UseGuards(NoteOwnershipGuard)
  async getNoteVersion(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('versionId', ParseUUIDPipe) versionId: string,
  ) {
    return this.noteVersionService.findVersion(id, versionId);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a note to a previous version' })
  @ApiResponse({ status: 200, description: 'Note restored to the specified version' })
  @UseGuards(NoteOwnershipGuard)
  async restoreVersion(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() restoreVersionDto: RestoreVersionDto,
    @Req() req,
  ) {
    return this.notesService.restoreVersion(id, restoreVersionDto.versionId, req.user.id);
  }

  @Get(':id/shared-users')
  @ApiOperation({ summary: 'Get all users with whom a note is shared' })
  @ApiResponse({ status: 200, description: 'Returns all users with access to the note' })
  @UseGuards(NoteOwnershipGuard)
  async getSharedUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.noteUserService.findSharedUsers(id);
  }
}