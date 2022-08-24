import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  albumId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
