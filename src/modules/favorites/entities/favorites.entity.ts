import { UsersEntity } from '../../users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AlbumsEntity } from '../../albums/entities/albums.entity';

@Entity('favorites')
export class FavoritesEntity extends BaseEntity<FavoritesEntity> {
  @ManyToOne(() => AlbumsEntity, (album) => album.favorites, { nullable: false })
  @JoinColumn({ name: 'album_id' })
  album: AlbumsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.favorites, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  constructor(entity: Partial<FavoritesEntity>) {
    super(entity);
    Object.assign(this, entity);
  }
}
