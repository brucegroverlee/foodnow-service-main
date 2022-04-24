import UnauthorizedError from '../../../../framework/express/errors/UnauthorizedError';

class TokenIsExpiredError extends UnauthorizedError {
  constructor() {
    super('The token is expired');
  }
}

export default TokenIsExpiredError;
