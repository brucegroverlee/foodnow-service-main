import request from 'supertest';
import { faker } from '@faker-js/faker';
import { httpServer } from '../../../../../apps/server';
import TokensDTO from '../../../application/TokensDTO';
import UserDTO from '../../../application/UserDTO';
import { db } from '../../UsersDAOImpl';
import { ErrorBody } from '../../../../../framework/express/middlewares/errorHandler';

const URL_TO_BE_TESTED = '/auth/register';

describe(`POST ${URL_TO_BE_TESTED}`, () => {
  describe('successful test suit', () => {
    test('it should create a new user', async () => {
      /* Given */

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });

      /* Then */
      expect(response.status).toEqual(201);

      const registerData = response.body as TokensDTO;
      expect(typeof registerData.accessToken).toBe('string');
      expect(typeof registerData.refreshToken).toBe('string');
      expect(typeof registerData.expires).toBe('number');
    });
  });

  describe('it should fail', () => {
    test('failed because the user already exist', async () => {
      /* Given */
      const newUser: UserDTO = {
        id: 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      db.push(newUser);

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        email: newUser.email,
        password: faker.internet.password(),
      });

      /* Then */
      expect(response.status).toEqual(409);

      const errorData = response.body as ErrorBody;
      expect(errorData).toHaveProperty('errors');
      expect(errorData.errors).toMatchObject([
        {
          code: 409,
          message: 'The email already exists',
        },
      ]);
    });

    test('failed because there is not the attribute password in the body', async () => {
      /* Given */

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        email: faker.internet.email(),
      });

      /* Then */
      expect(response.status).toEqual(400);

      const errorData = response.body as ErrorBody;
      expect(errorData).toHaveProperty('errors');
      expect(errorData.errors).toMatchObject([
        {
          field: 'password',
          message: '"password" is required',
        },
      ]);
    });

    test('failed because there is not the attribute email in the body', async () => {
      /* Given */

      /* When */
      const response = await request(httpServer.app).post(URL_TO_BE_TESTED).send({
        password: faker.internet.password(),
      });

      /* Then */
      expect(response.status).toEqual(400);

      const errorData = response.body as ErrorBody;
      expect(errorData).toHaveProperty('errors');
      expect(errorData.errors).toMatchObject([
        {
          field: 'email',
          message: '"email" is required',
        },
      ]);
    });
  });
});
