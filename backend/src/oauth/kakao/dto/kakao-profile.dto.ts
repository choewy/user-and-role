export class KakaoProfileDto {
  constructor(
    public readonly nickname: string,
    public readonly profileImageUrl: string,
    public readonly thumbnailImageUrl: string,
  ) {}
}
