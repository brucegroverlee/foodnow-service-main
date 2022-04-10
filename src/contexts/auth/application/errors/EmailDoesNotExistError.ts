import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class EmailDoesNotExistError extends BadRequestError {
  constructor() {
    super('Email does not exist');
  }
}

export default EmailDoesNotExistError;
