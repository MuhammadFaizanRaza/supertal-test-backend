import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  albumId: string;
}
