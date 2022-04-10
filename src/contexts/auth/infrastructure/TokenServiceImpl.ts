import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import config from '../../../framework/config';
import TokenService from '../application/TokenService';
import { EntityId } from '../../../framework/domain/types';
import UserDTO from '../application/UserDTO';

export const tokenServiceImpl: TokenService = {
  getRenewAccessToken: function (user: UserDTO): { accessToken: string; expires: number } {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
        },
      },
      config.jwt.accessTokenSecret,
      {
        expiresIn: '1h',
      },
    );

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

  getTokens: async function (data: {
    id: EntityId;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string; expires: number }> {
    const accessToken = jwt.sign({ user: data }, config.jwt.accessTokenSecret, {
      expiresIn: '1h',
    });

    const refreshToken = v4();

    return {
      accessToken,
      refreshToken,
      expires: 3600,
    };
  },
};
