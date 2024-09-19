import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TictokService } from '@libs/tictok';
import { LoginDto } from '../../controllers/auth/dto';
import { EncryptionService } from '@libs/encryption';
import { UserAuthRepository, UserRepository } from '@libs/database';

@Injectable()
export class AuthService {
  constructor(
    private readonly tictokService: TictokService,
    private readonly encryptionService: EncryptionService,
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  async tictokAuthorizeExecute() {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    try {
      const user = await this.checkUser(email);
      if (
        !this.encryptionService.validatePassword(
          password,
          user.auth.salt,
          user.auth.password,
        )
      ) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }
      this.userAuthRepository.update(user.auth.id, {
        // access_token: this.encryptionService.
      });
    } catch (e) {
      throw e;
    }
  }

  async logout() {}

  async signUpByKakao() {}

  async checkUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        auth: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('해당 유저는 존재하지 않습니다.');
    }
    return user;
  }
}
