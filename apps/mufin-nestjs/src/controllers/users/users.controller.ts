import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../../services';
import {
  CreateUserDto,
  GetUsersDto,
  ResetUserPasswordDto,
  UpdateUserDto,
} from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() dto: GetUsersDto) {
    return this.usersService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Patch(':id/reset-password')
  resetUserPassword(
    @Param('id') id: string,
    @Body() dto: ResetUserPasswordDto,
  ) {
    const { password } = dto;
    return this.usersService.resetUserPassword(id, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
