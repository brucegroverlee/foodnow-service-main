import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class TokenIsExpiredError extends BadRequestError {
  constructor() {
    super('The token is expired');
  }
}

export default TokenIsExpiredError;
