import { EntityId } from '../../../framework/domain/types';
import UserDTO from './UserDTO';

interface UsersDAO {
  getById(userId: EntityId): Promise<UserDTO | null>;
}

export default UsersDAO;
