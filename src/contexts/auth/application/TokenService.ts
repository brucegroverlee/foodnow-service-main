import { EntityId } from '../../../framework/domain/types';
import UserDTO from './UserDTO';

interface TokenService {
  getRenewAccessToken(user: UserDTO): { accessToken: string; expires: number };
  isRefreshTokenExpired(data: { token: string; expiresIn: Date }): boolean;
  getTokens(data: {
    id: EntityId;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string; expires: number }>;
}

export default TokenService;
