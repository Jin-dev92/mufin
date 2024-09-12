import { Injectable } from '@nestjs/common';
import { TictokService } from '@libs/tictok';

@Injectable()
export class AuthService {
  constructor(private readonly tictokService: TictokService) {}

  async tictokAuthorizeExecute() {}
}
