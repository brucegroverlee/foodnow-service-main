import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../../framework/express/types';
import UsersApplication, { MeData } from '../../application/UsersApplication';
import { usersDAOImpl } from '../UsersDAOImpl';
import UsersPresenterImpl from '../UsersPresenterImpl';

class UsersController {
  private usersApplication: UsersApplication;

  constructor() {
    this.usersApplication = new UsersApplication(usersDAOImpl);
  }

  public async me(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const withAuthRequest = request as AuthenticatedRequest;

      const data: MeData = {
        userId: withAuthRequest.user.id,
      };

      const presenter = new UsersPresenterImpl(response);

      await this.usersApplication.me(data, presenter);
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
