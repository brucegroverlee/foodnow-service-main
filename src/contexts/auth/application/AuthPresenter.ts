import TokensDTO from './TokensDTO';

interface AuthPresenter {
  returnSignupTokens(data: TokensDTO): void;
  returnLoginTokens(data: TokensDTO): void;
  returnAccessToken(data: Omit<TokensDTO, 'refreshToken'>): void;
}

export default AuthPresenter;
