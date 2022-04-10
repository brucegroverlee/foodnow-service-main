import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class PasswordIsNotValidError extends BadRequestError {
  constructor() {
    super('Password is not valid');
  }
}

export default PasswordIsNotValidError;
