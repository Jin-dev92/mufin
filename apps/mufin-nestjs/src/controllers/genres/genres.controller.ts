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
  async create(@Body() dto: CreateGenresDto) {
    const genre = await this.genreService.create(dto);
    return genre.id;
  }

  @Get()
  async findAll() {
    const [genres, count] = await this.genreService.findAll();
    return { genres, count };
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
