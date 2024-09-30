import { Injectable } from '@nestjs/common';
import { GoogleAuth } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOauthService {
  private readonly _authClient: GoogleAuth;
  constructor(private readonly configService: ConfigService) {
    this._authClient = new GoogleAuth({
      credentials: {
        client_email: this.configService.get('GOOGLE_PURCHASE_CLIENT_EMAIL'),
        private_key: this.configService.get('GOOGLE_PURCHASE_PRIVATE_KEY'),
      },
      scopes: [],
    });
  }

  get authClient(): GoogleAuth {
    return this._authClient;
  }
}
