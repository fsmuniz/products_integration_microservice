import { HttpStatus } from '@nestjs/common';
import { TResponseMessage } from 'src/types/enviroments.types';
import { responseHttpErrorMessage } from './http-responses.constant';

export const responsePgErrorMessage: TResponseMessage = {
  23505: {
    ...responseHttpErrorMessage[HttpStatus.BAD_REQUEST],
    message: ['Resource already exists'],
  },
  23503: {
    ...responseHttpErrorMessage[HttpStatus.BAD_REQUEST],
    message: ['Invalid relation'],
  },
  unknown: responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
};
