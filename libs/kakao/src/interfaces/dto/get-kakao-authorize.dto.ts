export class GetKakaoAuthorizeDto {
  client_id: string; //	앱 REST API 키
  redirect_uri: string; //	인가 코드를 전달받을 서비스 서버의 URI
  response_type: string; //	code로 고정	O
  scope?: string; //	추가 항목 동의 받기 요청 시 사용
  prompt?: string;
  login_hint?: string;
  service_terms?: string;
  state?: string;
  nonce?: string;
}
