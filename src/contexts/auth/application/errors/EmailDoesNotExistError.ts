import BadRequestError from '../../../../framework/express/errors/BadRequestError';

class EmailDoesNotExistError extends BadRequestError {
  constructor() {
    super('The email does not exist');
  }
}

export default EmailDoesNotExistError;
