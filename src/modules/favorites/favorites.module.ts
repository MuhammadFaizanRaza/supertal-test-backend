import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesRepository } from './repositories/favorites.repository';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumsRepository } from '../albums/repositories/albums.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesRepository, AlbumsRepository])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
