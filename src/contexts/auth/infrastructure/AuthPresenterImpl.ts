import { Response } from 'express';
import AuthPresenter from '../application/AuthPresenter';

class AuthPresenterImpl implements AuthPresenter {
  public static RETURN_SUCCESS_AUTH_STATUS_CODE = 200;

  constructor(private response: Response) {}

  returnTokens(data: { accessToken: string; refreshToken: string; expires: number }): void {
    this.response.status(AuthPresenterImpl.RETURN_SUCCESS_AUTH_STATUS_CODE).json(data);
  }

  returnAccessToken(data: { accessToken: string; expires: number }): void {
    this.response.status(AuthPresenterImpl.RETURN_SUCCESS_AUTH_STATUS_CODE).json(data);
  }
}

export default AuthPresenterImpl;
