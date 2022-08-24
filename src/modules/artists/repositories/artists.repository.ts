import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ArtistDto } from '../dto/artist.dto';
import { ArtistsEntity } from '../entities/artists.entity';

@EntityRepository(ArtistsEntity)
export class ArtistsRepository extends BaseRepository<ArtistsEntity> {
  async insertData(artist: Partial<ArtistsEntity>): Promise<ArtistsEntity> {
    const artistEntity = this.create(artist);
    return this.save(artistEntity);
  }
}
