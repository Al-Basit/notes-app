import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Visibility } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ description: 'Title of the note' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ description: 'Content of the note' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ 
    description: 'Visibility of the note', 
    enum: Visibility, 
    default: Visibility.PRIVATE 
  })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiProperty({ 
    description: 'Tags to associate with the note', 
    type: [String],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}