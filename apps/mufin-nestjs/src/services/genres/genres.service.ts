import { Injectable } from '@nestjs/common';
import { CreateGenresDto, UpdateGenresDto } from '../../controllers';

@Injectable()
export class GenresService {
  create(createGenresDto: CreateGenresDto) {
    return 'This action adds a new genre';
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenresDto: UpdateGenresDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
