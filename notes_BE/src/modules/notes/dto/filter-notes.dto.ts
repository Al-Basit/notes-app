import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Visibility } from '@prisma/client';

export class FilterNotesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiProperty({ required: false, enum: Visibility })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  authorId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isArchived?: boolean;
}