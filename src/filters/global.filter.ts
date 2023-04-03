import { Catch, HttpException, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(HttpException, RpcException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | RpcException, host: ArgumentsHost) {
    if (exception instanceof RpcException) {
      // throw RPC exception
      return throwError(() => exception.getError());
    } else {
      // throw HTTP expeption
      return throwError(() => exception.getResponse());
    }
  }
}
