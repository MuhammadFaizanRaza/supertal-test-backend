import * as _ from 'lodash';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { hashCompare, hashString } from '../../../common/helpers/bcrypt';
import { FavoritesEntity } from '../../favorites/entities/favorites.entity';

@Entity('users')
export class UsersEntity extends BaseEntity<UsersEntity> {
  @OneToMany(() => FavoritesEntity, (favorite) => favorite.user)
  favorites: FavoritesEntity[];

  @Column({ nullable: false, unique: true }) email: string;

  @Column({ nullable: false }) password: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) this.password = await hashString(this.password);
  }

  validatePassword(password: string): Promise<any> {
    return hashCompare(password, this.password);
  }

  userSanitize(): UsersEntity {
    const data = _.omit(this, ['password']);
    return data;
  }

  constructor(entity: Partial<UsersEntity>) {
    super(entity);
    Object.assign(this, entity);
  }
}
