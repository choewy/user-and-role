export class KakaoProfileDto {
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  constructor(kakaoProfile: KakaoProfileAPIResponse) {
    const { properties } = kakaoProfile;
    this.nickname = properties.nickname;
    this.profileImageUrl = properties.profile_image;
    this.thumbnailImageUrl = properties.thumbnail_image;
  }
}
