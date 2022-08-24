import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsRepository } from '../albums/repositories/albums.repository';
import { TracksRepository } from './repositories/tracks.repository';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TracksRepository, AlbumsRepository])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
