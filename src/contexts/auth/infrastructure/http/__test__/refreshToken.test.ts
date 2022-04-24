import request from 'supertest';
import { faker } from '@faker-js/faker';
import { httpServer } from '../../../../../apps/server';
import TokensDTO from '../../../application/TokensDTO';
import UserDTO from '../../../application/UserDTO';
import { db as dbUsers } from '../../UsersDAOImpl';
import { ErrorBody } from '../../../../../framework/express/middlewares/errorHandler';
import { tokenServiceImpl } from '../../TokenServiceImpl';
import { passwordServiceImpl } from '../../PasswordServiceImpl';
import { refreshTokenDAOImpl } from '../../RefreshTokenDAOImpl';
import { v4 } from 'uuid';

const URL_TO_BE_TESTED = '/auth/refresh-token';

describe(`POST ${URL_TO_BE_TESTED}`, () => {
  describe('successful test suit', () => {
    test('it should return a new access token', async () => {
      /* Given */
      const password = faker.internet.password();

      const newUser: UserDTO = {
        id: 1,
        email: faker.internet.email(),
        password: await passwordServiceImpl.encryptPassword(password),
      };
      dbUsers.push(newUser);

      const tokens = await tokenServiceImpl.getTokens({
        id: newUser.id,
        email: newUser.email,
      });

      await refreshTokenDAOImpl.add({
        token: tokens.refreshToken,
        userId: newUser.id,
      });

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        refreshToken: tokens.refreshToken,
      });

      /* Then */
      expect(response.status).toEqual(200);

      const data = response.body as TokensDTO;
      expect(typeof data.accessToken).toBe('string');
      expect(typeof data.expires).toBe('number');
    });
  });

  describe('it should fail', () => {
    test('failed because there is not the attribute refreshToken in the body', async () => {
      /* Given */

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({});

      /* Then */
      expect(response.status).toEqual(400);

      const errorData = response.body as ErrorBody;
      expect(errorData).toHaveProperty('errors');
      expect(errorData.errors).toMatchObject([
        {
          field: 'refreshToken',
          message: '"refreshToken" is required',
        },
      ]);
    });

    test('failed because the refresh token does not exist', async () => {
      /* Given */
      const refreshToken = v4();

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        refreshToken,
      });

      /* Then */
      expect(response.status).toEqual(401);

      const errorData = response.body as ErrorBody;
      expect(errorData).toHaveProperty('errors');
      expect(errorData.errors).toMatchObject([
        {
          code: 401,
          message: "The token doesn't exist",
        },
      ]);
    });
  });
});
