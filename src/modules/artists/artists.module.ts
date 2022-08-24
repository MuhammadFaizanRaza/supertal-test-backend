import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsRepository } from './repositories/artists.repository';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistsRepository])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
