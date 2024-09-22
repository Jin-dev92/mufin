import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMusicDto, UpdateMusicDto } from './dto';
import { MusicsService } from '../../services';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  create(@Body() dto: CreateMusicDto) {
    return this.musicsService.create(dto);
  }

  @Get()
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMusicDto) {
    return this.musicsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicsService.remove(+id);
  }
}
