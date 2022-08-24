import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../../common/dto/base-response';
import { AlbumDto } from './dto/album.dto';
import { AlbumsRepository } from './repositories/albums.repository';
import { AlbumsEntity } from './entities/albums.entity';
import { ArtistsRepository } from '../artists/repositories/artists.repository';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumsRepository)
    private readonly albumsRepository: AlbumsRepository,
    @InjectRepository(ArtistsRepository)
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  async create(albumDto: AlbumDto): Promise<ResponseDto<{ album: AlbumsEntity }>> {
    try {
      const isExistArtist = await this.artistsRepository.findOne(albumDto.artistId);

      if (!isExistArtist) {
        throw new NotFoundException('Artist does not exist');
      }

      const album = await this.albumsRepository.insertData({ ...albumDto, artist: isExistArtist });

      return { message: 'Album added successfully', data: { album } };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, albumDto: AlbumDto): Promise<ResponseDto<{ album: AlbumsEntity }>> {
    try {
      const isExist = await this.albumsRepository.findOne(id);

      if (!isExist) {
        throw new NotFoundException('Album does not exist');
      }

      const isExistArtist = await this.artistsRepository.findOne(albumDto.artistId);

      if (!isExistArtist) {
        throw new NotFoundException('Artist does not exist');
      }

      const album = await this.albumsRepository.insertData({
        id,
        ...albumDto,
        artist: isExistArtist,
      });

      return { message: 'Album updated successfully', data: { album } };
    } catch (error) {
      throw error;
    }
  }
}
