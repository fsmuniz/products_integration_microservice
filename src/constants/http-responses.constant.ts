import { HttpStatus } from '@nestjs/common';
import { TResponseMessage } from 'src/types/enviroments.types';

export const responseHttpErrorMessage: TResponseMessage = {
  [HttpStatus.BAD_REQUEST]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: ['Request is inválid'],
    error: 'Bad Request'
  },
  [HttpStatus.NOT_FOUND]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: ['Resource not found'],
    error: 'Not found'
  },
  [HttpStatus.UNAUTHORIZED]: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: ['Invalid credentials'],
    error: 'Unauthorized'
  },
  [HttpStatus.FORBIDDEN]: {
    statusCode: HttpStatus.FORBIDDEN,
    message: ['Not authorized'],
    error: 'Unauthorized'
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: ['Erro ao enviar evento para o microserviço de produtos.'],
    error: 'Internal server error'
  },
  [HttpStatus.REQUEST_TIMEOUT]: {
    statusCode: HttpStatus.REQUEST_TIMEOUT,
    message: ['Timeout has occurred'],
    error: 'Request timeout'
  }
};
