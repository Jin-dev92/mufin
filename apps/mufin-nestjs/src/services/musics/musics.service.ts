import { Injectable } from '@nestjs/common';
import { CreateMusicDto, UpdateMusicDto } from '../../controllers';

@Injectable()
export class MusicsService {
  create(createMusicDto: CreateMusicDto) {
    return 'This action adds a new music';
  }

  findAll() {
    return `This action returns all musics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }
}
