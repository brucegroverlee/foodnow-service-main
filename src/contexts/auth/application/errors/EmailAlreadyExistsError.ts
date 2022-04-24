import ConflictError from '../../../../framework/express/errors/ConflictError';

class EmailAlreadyExistsError extends ConflictError {
  constructor() {
    super('The email already exists');
  }
}

export default EmailAlreadyExistsError;
