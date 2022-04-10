import { Response } from 'express';
import UserDTO from '../application/UserDTO';
import UsersPresenter from '../application/UsersPresenter';

class UsersPresenterImpl implements UsersPresenter {
  public static RETURN_USER_STATUS_CODE = 200;

  constructor(private response: Response) {}

  returnUser(user: UserDTO): void {
    this.response.status(UsersPresenterImpl.RETURN_USER_STATUS_CODE).json(user);
  }
}

export default UsersPresenterImpl;
