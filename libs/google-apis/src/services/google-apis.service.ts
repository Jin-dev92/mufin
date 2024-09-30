import { Injectable } from '@nestjs/common';
import { youtube_v3 } from 'googleapis';
import { GoogleOauthService } from '@libs/google-apis/services/google-oauth.service';

@Injectable()
export class GoogleApisService {
  private readonly _youtubeService: youtube_v3.Youtube;

  constructor(private readonly googleOauthService: GoogleOauthService) {
    this._youtubeService = new youtube_v3.Youtube({
      auth: this.googleOauthService.authClient,
    });
  }
}
