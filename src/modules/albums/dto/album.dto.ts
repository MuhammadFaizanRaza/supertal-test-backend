import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  artistId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
