import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class TokenDoesNotExistError extends BadRequestError {
  constructor() {
    super("The token doesn't exist");
  }
}

export default TokenDoesNotExistError;
