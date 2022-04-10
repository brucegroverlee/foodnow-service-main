import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import config from '../../../framework/config';
import TokenService from '../application/TokenService';
import { EntityId } from '../../../framework/domain/types';
import UserDTO from '../application/UserDTO';
import { AccessTokenPayload } from '../../../framework/express/types';

const TOKEN_EXPIRES_IN = '15m';

export const tokenServiceImpl: TokenService = {
  getRenewAccessToken: function (user: UserDTO): { accessToken: string; expires: number } {
    const accessTokenPayload: AccessTokenPayload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(accessTokenPayload, config.jwt.accessTokenSecret, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
      expires: 3600,
    };
  },

  isRefreshTokenExpired: function (data: { token: string; expiresIn: Date }): boolean {
    const now = new Date().getTime();

    const expiresIn = data.expiresIn.getTime();

    return now > expiresIn;
  },

  getTokens: async function (user: {
    id: EntityId;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string; expires: number }> {
    const accessTokenPayload: AccessTokenPayload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(accessTokenPayload, config.jwt.accessTokenSecret, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    const refreshToken = v4();

    return {
      accessToken,
      refreshToken,
      expires: 3600,
    };
  },
};
