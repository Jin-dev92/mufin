import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from '../../controllers';
import {
  DatabaseService,
  User,
  UserAuth,
  UserAuthRepository,
  UserRepository,
} from '@libs/database';
import { EncryptionService } from '@libs/encryption';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
    private readonly encryptionService: EncryptionService,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(dto: CreateUserDto) {
    const { password } = dto;
    const queryRunner = this.databaseService.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let userAuth: UserAuth = null;
      if (password) {
        const salt = this.encryptionService.getSalt();
        userAuth = this.userAuthRepository.create({
          password: this.encryptionService.hashPassword(password, salt),
          salt,
        });
        await queryRunner.manager.save(userAuth);
      }
      const user = this.userRepository.create({ ...dto, userAuth });
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return user;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(dto: GetUsersDto) {
    const { skip, take } = dto;
    return this.userRepository.findAndCount({
      skip,
      take,
    });
  }

  findOne(uuid: string) {
    return this.checkUser(uuid);
  }

  async update(uuid: string, dto: UpdateUserDto) {
    const data: Omit<UpdateUserDto, 'password'> = {
      ...dto,
    };
    const queryRunner = this.databaseService.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.checkUserWithUserAuth(uuid);
      await queryRunner.manager.update(User, { uuid }, data);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(uuid: string) {
    const user = await this.checkUser(uuid);
    await this.userRepository.remove(user);
  }

  async resetUserPassword(uuid: string, password: string) {
    try {
      const user = await this.checkUserWithUserAuth(uuid);
      if (
        !this.encryptionService.validatePassword(
          password,
          user.userAuth.salt,
          user.userAuth.password,
        )
      ) {
        const salt = this.encryptionService.getSalt();
        user.userAuth.password = this.encryptionService.hashPassword(
          password,
          salt,
        );
        user.userAuth.salt = salt;
        await this.userAuthRepository.save(user.userAuth);
      }
    } catch (e) {
      throw e;
    }
  }

  private async checkUser(uuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  private async checkUserWithUserAuth(uuid: string) {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: {
        userAuth: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
