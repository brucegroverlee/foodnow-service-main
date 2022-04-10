import BadRequestError from '../../../framework/express/errors/BadRequestError';

class UserDoesNotExistError extends BadRequestError {
  constructor() {
    super('The user associated with the token does not exist');
  }
}

export default UserDoesNotExistError;
