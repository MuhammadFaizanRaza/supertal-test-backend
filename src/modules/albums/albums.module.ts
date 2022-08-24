import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsRepository } from './repositories/albums.repository';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { ArtistsRepository } from '../artists/repositories/artists.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumsRepository, ArtistsRepository])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
