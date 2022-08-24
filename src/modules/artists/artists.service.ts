import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../../common/dto/base-response';
import { ArtistDto } from './dto/artist.dto';
import { ArtistsEntity } from './entities/artists.entity';
import { ArtistsRepository } from './repositories/artists.repository';
@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistsRepository)
    private readonly artistsRepository: ArtistsRepository,
  ) {}

  async create(artistDto: ArtistDto): Promise<ResponseDto<{ artist: ArtistsEntity }>> {
    try {
      const artist = await this.artistsRepository.insertData(artistDto);

      return { message: 'Artist added successfully', data: { artist } };
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, artistDto: ArtistDto): Promise<ResponseDto<{ artist: ArtistsEntity }>> {
    try {
      const isExist = await this.artistsRepository.findOne(id);

      if (!isExist) {
        throw new NotFoundException('Artist does not exist');
      }
      const artist = await this.artistsRepository.insertData({ id, ...artistDto });

      return { message: 'Artist updated successfully', data: { artist } };
    } catch (error) {
      throw error;
    }
  }
}
