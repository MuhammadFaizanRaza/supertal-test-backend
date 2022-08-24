import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { FavoritesEntity } from '../entities/favorites.entity';

@EntityRepository(FavoritesEntity)
export class FavoritesRepository extends BaseRepository<FavoritesEntity> {
  async insertData(favorite: Partial<FavoritesEntity>): Promise<FavoritesEntity> {
    const favoriteEntity = this.create(favorite);
    return this.save(favoriteEntity);
  }
}
