import UsersDAO from '../application/UsersDAO';
import UserDTO from '../application/UserDTO';
import { EntityId } from '../../../framework/domain/types';

export const db: UserDTO[] = [];

export const usersDAOImpl: UsersDAO = {
  async getOneByEmail(email: string): Promise<UserDTO | null> {
    const user = db.find((user) => user.email === email);

    if (!user) return null;

    return user;
  },

  async existEmail(email: string): Promise<boolean> {
    return db.some((user) => user.email === email);
  },

  async add(data: { email: string; password: string }): Promise<EntityId> {
    const id = db.length + 1;

    const newRow: UserDTO = {
      id,
      email: data.email,
      password: data.password,
    };

    db.push(newRow);

    console.table(db);

    return id;
  },

  async getById(userId: EntityId): Promise<UserDTO | null> {
    return db[userId - 1];
  },
};
