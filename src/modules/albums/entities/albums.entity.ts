import { FavoritesEntity } from 'src/modules/favorites/entities/favorites.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ArtistsEntity } from '../../artists/entities/artists.entity';
import { TracksEntity } from '../../tracks/entities/tracks.entity';

@Entity('albums')
export class AlbumsEntity extends BaseEntity<AlbumsEntity> {
  @ManyToOne(() => ArtistsEntity, (artist) => artist.albums, { nullable: false })
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistsEntity;

  @OneToMany(() => TracksEntity, (track) => track.album)
  tracks: TracksEntity[];

  @OneToMany(() => FavoritesEntity, (favorite) => favorite.album)
  favorites: FavoritesEntity[];

  @Column({ nullable: false }) name: string;

  constructor(entity: Partial<AlbumsEntity>) {
    super(entity);
    Object.assign(this, entity);
  }
}
