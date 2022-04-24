import RefreshTokenDAO from '../application/RefreshTokenDAO';
import { EntityId } from '../../../framework/domain/types';

interface Token {
  token: string;
  expiresIn: Date;
  userId: EntityId;
}

export const db: Token[] = [];

export const refreshTokenDAOImpl: RefreshTokenDAO = {
  delete: async function (data: { token: string }): Promise<void> {
    const index = db.findIndex((row) => row.token === data.token);

    if (index < 0) return;

    db.splice(index, 1);
  },

  get: async function (token: string): Promise<{ token: string; expiresIn: Date; userId: EntityId } | null> {
    const dbToken = db.find((rowToken) => rowToken.token === token);

    if (!dbToken) return null;

    return dbToken;
  },

  add: async function (data: { token: string; userId: EntityId }): Promise<void> {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const newRow: Token = {
      token: data.token,
      expiresIn: date,
      userId: data.userId,
    };

    db.push(newRow);

    console.table(db);
  },
};
