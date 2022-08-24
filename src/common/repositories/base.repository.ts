import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {
  //   findById(id: string, options?: FindManyOptions<T>): Promise<T> {
  //     return super.findByIds([id], options).then(([entity]) => entity);
  //   }
}
