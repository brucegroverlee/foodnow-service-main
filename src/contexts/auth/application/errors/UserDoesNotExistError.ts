import UnauthorizedError from '../../../../framework/express/errors/UnauthorizedError';

class UserDoesNotExistError extends UnauthorizedError {
  constructor() {
    super('The user associated with the token does not exist');
  }
}

export default UserDoesNotExistError;
