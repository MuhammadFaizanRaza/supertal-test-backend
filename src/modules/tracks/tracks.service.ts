import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../../common/dto/base-response';
import { AlbumsRepository } from '../albums/repositories/albums.repository';
import { TrackDto } from './dto/track.dto';
import { TracksEntity } from './entities/tracks.entity';
import { TracksRepository } from './repositories/tracks.repository';
@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TracksRepository)
    private readonly tracksRepository: TracksRepository,
    @InjectRepository(AlbumsRepository)
    private readonly albumsRepository: AlbumsRepository,
  ) {}

  async create(trackDto: TrackDto): Promise<ResponseDto<{ track: TracksEntity }>> {
    try {
      const isExistAlbum = await this.albumsRepository.findOne(trackDto.albumId);

      if (!isExistAlbum) {
        throw new NotFoundException('Album does not exist');
      }

      const track = await this.tracksRepository.insertData({ ...trackDto, album: isExistAlbum });

      return { message: 'Track added successfully', data: { track } };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, trackDto: TrackDto): Promise<ResponseDto<{ track: TracksEntity }>> {
    try {
      const isExist = await this.tracksRepository.findOne(id);

      if (!isExist) {
        throw new NotFoundException('Track does not exist');
      }

      const isExistAlbum = await this.albumsRepository.findOne(trackDto.albumId);

      if (!isExistAlbum) {
        throw new NotFoundException('Album does not exist');
      }

      const track = await this.tracksRepository.insertData({
        id,
        ...trackDto,
        album: isExistAlbum,
      });

      return { message: 'Track updated successfully', data: { track } };
    } catch (error) {
      throw error;
    }
  }
}
