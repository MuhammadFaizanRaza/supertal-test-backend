import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../../common/dto/base-response';
import { AlbumsRepository } from '../albums/repositories/albums.repository';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesRepository } from './repositories/favorites.repository';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesRepository)
    private readonly favoritesRepository: FavoritesRepository,
    @InjectRepository(AlbumsRepository)
    private readonly albumsRepository: AlbumsRepository,
  ) {}

  async create(
    user: UsersEntity,
    favoriteDto: FavoriteDto,
  ): Promise<ResponseDto<{ favorite: FavoritesEntity }>> {
    try {
      const isExistAlbum = await this.albumsRepository.findOne(favoriteDto.albumId);

      if (!isExistAlbum) {
        throw new NotFoundException('Album does not exist');
      }

      const favorite = await this.favoritesRepository.insertData({
        album: isExistAlbum,
        user,
      });

      return { message: 'Favorite added successfully', data: { favorite } };
    } catch (error) {
      throw error;
    }
  }
}
