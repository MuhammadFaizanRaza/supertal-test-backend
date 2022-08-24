import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AlbumsEntity } from '../../albums/entities/albums.entity';

@Entity('artists')
export class ArtistsEntity extends BaseEntity<ArtistsEntity> {
  @OneToMany(() => AlbumsEntity, (album) => album.artist)
  albums: AlbumsEntity[];

  @Column({ nullable: false }) name: string;

  constructor(entity: Partial<AlbumsEntity>) {
    super(entity);
    Object.assign(this, entity);
  }
}
