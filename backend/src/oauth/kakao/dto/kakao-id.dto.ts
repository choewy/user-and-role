export class KakaoIdDto {
  kakaoId: string;
  constructor(public readonly kakaoAccount: KakaoAccountAPIResponse) {
    this.kakaoId = String(kakaoAccount.id);
  }
}
