import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<T> {
  @PrimaryGeneratedColumn('uuid') id: string;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: string;

  constructor(entity: Partial<BaseEntity<T>>) {
    const { createdAt, deletedAt, id, updatedAt } = entity ?? {};
    Object.assign(this, { createdAt, deletedAt, id, updatedAt });
  }
}
