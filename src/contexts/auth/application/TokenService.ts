import { EntityId } from '../../../framework/domain/types';
import TokensDTO from './TokensDTO';
import UserDTO from './UserDTO';

interface TokenService {
  getRenewAccessToken(user: UserDTO): Omit<TokensDTO, 'refreshToken'>;
  isRefreshTokenExpired(data: { token: string; expiresIn: Date }): boolean;
  getTokens(data: { id: EntityId; email: string }): Promise<TokensDTO>;
}

export default TokenService;
