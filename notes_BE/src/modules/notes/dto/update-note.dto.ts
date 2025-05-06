import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiProperty({ 
    description: 'Archive status of the note',
    required: false
  })
  @IsBoolean()
  @IsOptional()
  is_archived?: boolean;
}