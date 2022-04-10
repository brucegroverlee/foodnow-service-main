import { EntityId } from '../../../framework/domain/types';

interface RefreshTokenDAO {
  delete(data: { token: string }): Promise<void>;
  get(token: string): Promise<{ token: string; expiresIn: Date; userId: EntityId } | null>;
  add(data: { token: string; userId: EntityId }): Promise<void>;
}

export default RefreshTokenDAO;
