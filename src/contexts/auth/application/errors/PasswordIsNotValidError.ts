import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class PasswordIsNotValidError extends BadRequestError {
  constructor() {
    super('The password is not valid');
  }
}

export default PasswordIsNotValidError;
