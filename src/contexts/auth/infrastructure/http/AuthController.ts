import { NextFunction, Request, Response } from 'express';
import AuthApplication, { RegisterData, LoginData, RefreshTokenData } from '../../application/AuthApplication';
import AuthPresenterImpl from '../AuthPresenterImpl';
import { passwordServiceImpl } from '../PasswordServiceImpl';
import { refreshTokenDAOImpl } from '../RefreshTokenDAOImpl';
import { tokenServiceImpl } from '../TokenServiceImpl';
import { usersDAOImpl } from '../UsersDAOImpl';

class AuthController {
  private authApplication: AuthApplication;

  constructor() {
    this.authApplication = new AuthApplication(
      usersDAOImpl,
      refreshTokenDAOImpl,
      passwordServiceImpl,
      tokenServiceImpl,
    );
  }

  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const data = request.body as RegisterData;

      const presenter = new AuthPresenterImpl(response);

      await this.authApplication.register(data, presenter);
    } catch (error) {
      next(error);
    }
  }

  public async login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const data = request.body as LoginData;

      const presenter = new AuthPresenterImpl(response);

      await this.authApplication.login(data, presenter);
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const data = request.body as RefreshTokenData;

      const presenter = new AuthPresenterImpl(response);

      await this.authApplication.refreshToken(data, presenter);
    } catch (error) {
      next(error);
    }
  }

  /* public async sendResetPasswordEmail(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  } */

  /* public async resetPassword(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
    } catch (error) {
      next(error);
    }
  } */
}

export default AuthController;
