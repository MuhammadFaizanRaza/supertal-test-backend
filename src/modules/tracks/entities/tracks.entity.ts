import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AlbumsEntity } from '../../albums/entities/albums.entity';

@Entity('tracks')
export class TracksEntity extends BaseEntity<TracksEntity> {
  @ManyToOne(() => AlbumsEntity, (album) => album.tracks, { nullable: false })
  @JoinColumn({ name: 'album_id' })
  album: AlbumsEntity;

  @Column({ nullable: false }) name: string;

  constructor(entity: Partial<TracksEntity>) {
    super(entity);
    Object.assign(this, entity);
  }
}
