export class GetKakaoTokenDto {
  grant_type: string; //	authorization_code로 고정
  client_id: string; //	앱 REST API 키
  redirect_uri: string; //	인가 코드 발급 시 사용한 URI
  code: string; // 인가 코드
  /*
  * 토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드
[내 애플리케이션] > [카카오 로그인] > [보안]에서 설정 가능
ON 상태인 경우 필수 설정해야 함
  * */
  client_secret?: string;
}
