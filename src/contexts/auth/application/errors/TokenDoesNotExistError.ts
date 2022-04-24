import UnauthorizedError from '../../../../framework/express/errors/UnauthorizedError';

class TokenDoesNotExistError extends UnauthorizedError {
  constructor() {
    super("The token doesn't exist");
  }
}

export default TokenDoesNotExistError;
