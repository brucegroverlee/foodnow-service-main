import { EntityId } from '../../../framework/domain/types';
import UserDoesNotExistError from './UserDoesNotExistError';
import UsersDAO from './UsersDAO';
import UsersPresenter from './UsersPresenter';

export interface MeData {
  userId: EntityId;
}

class UsersApplication {
  constructor(private usersDAO: UsersDAO) {}

  public async me(data: MeData, presenter: UsersPresenter): Promise<void> {
    const user = await this.usersDAO.getById(data.userId);

    if (!user) throw new UserDoesNotExistError();

    presenter.returnUser(user);
  }
}

export default UsersApplication;
