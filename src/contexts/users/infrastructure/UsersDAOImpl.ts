import UsersDAO from '../application/UsersDAO';
import UserDTO from '../application/UserDTO';
import { EntityId } from '../../../framework/domain/types';
import { db } from '../../auth/infrastructure/UsersDAOImpl';

export const usersDAOImpl: UsersDAO = {
  async getById(userId: EntityId): Promise<UserDTO | null> {
    const user = db[userId - 1];

    return {
      id: user.id,
      email: user.email,
    };
  },
};
