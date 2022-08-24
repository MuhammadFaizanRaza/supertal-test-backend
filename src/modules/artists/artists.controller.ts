import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/base-response';
import { IdParamDto } from '../../common/dto/id-param';
import { ArtistsService } from './artists.service';
import { ArtistDto } from './dto/artist.dto';
import { ArtistsEntity } from './entities/artists.entity';

@ApiBearerAuth()
@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() artistDto: ArtistDto): Promise<ResponseDto<{ artist: ArtistsEntity }>> {
    return this.artistsService.create(artistDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() { id }: IdParamDto,
    @Body() artistDto: ArtistDto,
  ): Promise<ResponseDto<{ artist: ArtistsEntity }>> {
    return this.artistsService.update(id, artistDto);
  }
}
