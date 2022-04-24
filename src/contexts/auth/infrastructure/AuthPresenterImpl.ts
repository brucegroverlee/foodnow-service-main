import { Response } from 'express';
import AuthPresenter from '../application/AuthPresenter';
import TokensDTO from '../application/TokensDTO';

class AuthPresenterImpl implements AuthPresenter {
  constructor(private response: Response) {}

  returnSignupTokens(data: TokensDTO): void {
    this.response.status(201).json(data);
  }

  returnLoginTokens(data: TokensDTO): void {
    this.response.status(200).json(data);
  }

  returnAccessToken(data: Omit<TokensDTO, 'refreshToken'>): void {
    this.response.status(200).json(data);
  }
}

export default AuthPresenterImpl;
