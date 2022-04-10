import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class EmailAlreadyExistsError extends BadRequestError {
  constructor() {
    super('Email already exists');
  }
}

export default EmailAlreadyExistsError;
