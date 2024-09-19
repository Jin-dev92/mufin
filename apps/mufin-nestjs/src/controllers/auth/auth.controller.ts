import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  // @Post()
  // async create(@Body() dto: CreateGenresDto) {}
  //
  // @Get()
  // async findAll() {}
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {}
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateGenresDto) {}
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}
