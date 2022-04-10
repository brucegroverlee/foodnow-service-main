interface AuthPresenter {
  returnTokens(data: { accessToken: string; refreshToken: string; expires: number }): void;
  returnAccessToken(data: { accessToken: string; expires: number }): void;
}

export default AuthPresenter;
