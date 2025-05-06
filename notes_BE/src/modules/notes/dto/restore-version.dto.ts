import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RestoreVersionDto {
  @ApiProperty({ description: 'Version ID to restore' })
  @IsUUID('4')
  @IsNotEmpty()
  versionId: string;
}