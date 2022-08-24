import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './modules/users/guards/jwt.guard';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [CoreModule, UsersModule, ArtistsModule, AlbumsModule, TracksModule, FavoritesModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    AppService,
  ],
})
export class AppModule {}
