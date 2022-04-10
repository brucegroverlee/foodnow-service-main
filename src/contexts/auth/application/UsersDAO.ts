import { EntityId } from '../../../framework/domain/types';
import UserDTO from './UserDTO';

interface UsersDAO {
  getOneByEmail(email: string): Promise<UserDTO | null>;
  existEmail(email: string): Promise<boolean>;
  add(data: { email: string; password: string }): Promise<EntityId>;
  getById(userId: EntityId): Promise<UserDTO | null>;
}

export default UsersDAO;
