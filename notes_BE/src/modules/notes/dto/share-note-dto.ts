import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ShareNoteDto {
  @ApiProperty({ description: 'User IDs to share the note with' })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  userIds: string[];

  @ApiProperty({ 
    description: 'Whether shared users can edit the note',
    default: false
  })
  @IsBoolean()
  @IsOptional()
  canEdit?: boolean;
}