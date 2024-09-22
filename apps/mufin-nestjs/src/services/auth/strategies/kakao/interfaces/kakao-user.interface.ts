export interface IKakaoUser {
  kakaoId: string;
}
export interface IKaKaoUserRequest extends Request {
  user: IKakaoUser;
}
