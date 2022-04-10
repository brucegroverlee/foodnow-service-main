import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserTokenPayload, AccessTokenPayload, AuthenticatedRequest } from '../types';
import config from '../../config';
import UnauthorizedError from '../errors/UnauthorizedError';

function validateAuthentication(request: Request, response: Response, next: NextFunction) {
  if (!request.headers || !request.headers.authorization) {
    next(new UnauthorizedError());

    return;
  }

  const [schema, accessToken] = request.headers.authorization!.split(' ');

  const payload: AccessTokenPayload = jwt.verify(accessToken, config.jwt.accessTokenSecret);

  (request as AuthenticatedRequest).user = payload.user;

  next();
}

export default validateAuthentication;
