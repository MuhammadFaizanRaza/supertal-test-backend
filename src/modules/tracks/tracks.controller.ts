import { Body, Controller, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/base-response';
import { IdParamDto } from '../../common/dto/id-param';
import { TrackDto } from './dto/track.dto';
import { TracksEntity } from './entities/tracks.entity';
import { TracksService } from './tracks.service';

@ApiBearerAuth()
@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() trackDto: TrackDto): Promise<ResponseDto<{ track: TracksEntity }>> {
    return this.tracksService.create(trackDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() { id }: IdParamDto,
    @Body() trackDto: TrackDto,
  ): Promise<ResponseDto<{ track: TracksEntity }>> {
    return this.tracksService.update(id, trackDto);
  }
}
