import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Connection, getConnectionManager } from 'typeorm';

@Injectable()
export class Seeder implements OnApplicationBootstrap {
  async onApplicationBootstrap(): Promise<void> {
    const seederConnection = await this.connectSeederConnection();

    await seederConnection.runMigrations();
  }

  private async connectSeederConnection(): Promise<Connection> {
    return getConnectionManager().connections.find((connection) => connection.name === 'default');
  }
}
