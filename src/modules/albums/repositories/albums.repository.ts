import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { AlbumsEntity } from '../entities/albums.entity';

@EntityRepository(AlbumsEntity)
export class AlbumsRepository extends BaseRepository<AlbumsEntity> {
  async insertData(album: Partial<AlbumsEntity>): Promise<AlbumsEntity> {
    const albumEntity = this.create(album);
    return this.save(albumEntity);
  }
}
