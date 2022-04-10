import HttpError from './HttpError';

class BadRequestError extends HttpError {
  public errorCode: string | number;
  statusCode = 400;

  constructor(public message: string = 'Bad Request', errorCode?: string | number) {
    super(message);
    this.errorCode = errorCode || this.statusCode;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ code: this.errorCode, message: this.message }];
  }
}

export default BadRequestError;
