import { EntityId } from '../../../framework/domain/types';

interface UserDTO {
  id: EntityId;
  email: string;
}

export default UserDTO;
