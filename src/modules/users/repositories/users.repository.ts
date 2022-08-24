import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { UsersEntity } from '../entities/users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends BaseRepository<UsersEntity> {
  getUser(email): Promise<UsersEntity> {
    return this.findOne({
      where: {
        email: email,
      },
    });
  }
}
