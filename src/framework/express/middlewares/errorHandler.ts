import { Request, Response } from 'express';

import BaseError from '../errors/HttpError';

const errorHandler = (err: Error, req: Request, res: Response, next): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    console.error('ErrorHandler: Server Error 500');

    console.error(err);

    res.status(500).send({
      errors: [{ message: 'Something went wrong' }],
    });
  }
};

export default errorHandler;
