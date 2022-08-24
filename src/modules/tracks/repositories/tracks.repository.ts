import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { TracksEntity } from '../entities/tracks.entity';

@EntityRepository(TracksEntity)
export class TracksRepository extends BaseRepository<TracksEntity> {
  async insertData(track: Partial<TracksEntity>): Promise<TracksEntity> {
    const albumEntity = this.create(track);
    return this.save(albumEntity);
  }
}
