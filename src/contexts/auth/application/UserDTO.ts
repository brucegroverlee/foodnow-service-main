import { EntityId } from '../../../framework/domain/types';

interface UserDTO {
  id: EntityId;
  email: string;
  password: string;
}

export default UserDTO;
