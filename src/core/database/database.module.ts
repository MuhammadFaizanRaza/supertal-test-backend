import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './database.config';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptionsFactory } from './typeorm/typeorm-options-factory';
import { Seeder } from './seeders/seeders';

@Module({
  imports: [
    ConfigModule.forFeature(DatabaseConfig),
    NestTypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [ConfigService],
      useClass: TypeOrmOptionsFactory,
    }),
  ],
  providers: [TypeOrmOptionsFactory, Seeder],
})
export class DatabaseModule {}
