import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/base-response';
import { IdParamDto } from '../../common/dto/id-param';
import { AlbumsService } from './albums.service';
import { AlbumDto } from './dto/album.dto';
import { AlbumsEntity } from './entities/albums.entity';

@ApiBearerAuth()
@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() albumDto: AlbumDto): Promise<ResponseDto<{ album: AlbumsEntity }>> {
    return this.albumsService.create(albumDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() { id }: IdParamDto,
    @Body() albumDto: AlbumDto,
  ): Promise<ResponseDto<{ album: AlbumsEntity }>> {
    return this.albumsService.update(id, albumDto);
  }
}
