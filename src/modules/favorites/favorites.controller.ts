import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../common/dto/base-response';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoritesEntity } from './entities/favorites.entity';
import { FavoritesService } from './favorites.service';

@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Req() req,
    @Body() favoriteDto: FavoriteDto,
  ): Promise<ResponseDto<{ favorite: FavoritesEntity }>> {
    return this.favoritesService.create(req.user, favoriteDto);
  }
}
