import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoService {
  constructor(private readonly configService: ConfigService) {}
}
