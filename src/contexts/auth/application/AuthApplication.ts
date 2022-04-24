import UsersDAO from './UsersDAO';
import RefreshTokenDAO from './RefreshTokenDAO';
import PasswordService from './PasswordService';
import TokenService from './TokenService';
import AuthPresenter from './AuthPresenter';
import EmailAlreadyExistsError from './errors/EmailAlreadyExistsError';
import EmailDoesNotExistError from './errors/EmailDoesNotExistError';
import PasswordIsNotValidError from './errors/PasswordIsNotValidError';
import TokenDoesNotExistError from './errors/TokenDoesNotExistError';
import TokenIsExpiredError from './errors/TokenIsExpiredError';
import UserDoesNotExistError from './errors/UserDoesNotExistError';

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

class AuthApplication {
  constructor(
    private usersDAO: UsersDAO,
    private refreshTokenDAO: RefreshTokenDAO,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  public async register(data: RegisterData, authPresenter: AuthPresenter): Promise<void> {
    const existEmail = await this.usersDAO.existEmail(data.email);

    if (existEmail) {
      throw new EmailAlreadyExistsError();
    }

    const encryptedPassword = await this.passwordService.encryptPassword(data.password);

    const entityId = await this.usersDAO.add({
      email: data.email,
      password: encryptedPassword,
    });

    const tokens = await this.tokenService.getTokens({
      id: entityId,
      email: data.email,
    });

    await this.refreshTokenDAO.add({
      token: tokens.refreshToken,
      userId: entityId,
    });

    authPresenter.returnSignupTokens(tokens);

    // send welcome email
  }

  public async login(data: LoginData, authPresenter: AuthPresenter): Promise<void> {
    const user = await this.usersDAO.getOneByEmail(data.email);

    if (!user) {
      throw new EmailDoesNotExistError();
    }

    const isValidPassword = await this.passwordService.isValid(user.password, data.password);

    if (!isValidPassword) {
      throw new PasswordIsNotValidError();
    }

    const tokens = await this.tokenService.getTokens({
      id: user.id,
      email: data.email,
    });

    await this.refreshTokenDAO.add({
      token: tokens.refreshToken,
      userId: user.id,
    });

    authPresenter.returnLoginTokens(tokens);
  }

  public async refreshToken(data: RefreshTokenData, authPresenter: AuthPresenter): Promise<void> {
    const refreshToken = await this.refreshTokenDAO.get(data.refreshToken);

    if (!refreshToken) {
      throw new TokenDoesNotExistError();
    }

    if (this.tokenService.isRefreshTokenExpired(refreshToken)) {
      await this.refreshTokenDAO.delete(refreshToken);
      throw new TokenIsExpiredError();
    }

    const user = await this.usersDAO.getById(refreshToken.userId);

    if (!user) {
      throw new UserDoesNotExistError();
    }

    const accessToken = await this.tokenService.getRenewAccessToken(user);

    authPresenter.returnAccessToken(accessToken);
  }

  // public async sendResetPasswordEmail(data: any, authPresenter: AuthPresenter): Promise<void> {}

  // public async resetPassword(data: any, authPresenter: AuthPresenter): Promise<void> {}
}

export default AuthApplication;
