import { Request } from 'express';
import { EntityId } from '../domain/types';

export type UserTokenPayload = {
  id: EntityId;
};

export type AccessTokenPayload = {
  user: UserTokenPayload;
};

export type AuthenticatedRequest = Request & AccessTokenPayload;
