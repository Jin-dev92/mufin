import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GenresService } from '../../services';
import { CreateGenresDto, UpdateGenresDto } from './dto';

@Controller('genre')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Post()
  create(@Body() dto: CreateGenresDto) {
    return this.genreService.create(dto);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenresDto) {
    return this.genreService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
