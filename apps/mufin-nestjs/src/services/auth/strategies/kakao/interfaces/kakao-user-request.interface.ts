import { IKakaoUser } from './kakao-user.interface';

export interface IKaKaoUserRequest extends Request {
  user: IKakaoUser;
}
