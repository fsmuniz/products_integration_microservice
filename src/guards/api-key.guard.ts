import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { responseHttpErrorMessage } from 'src/constants/http-responses.constant';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToRpc().getContext<RmqContext>();
    const headerApiKey = ctx.getMessage().properties.headers.apiKey;
    const apiKey = this.configService.get('PRODUCT_MICROSERVICE_TOKEN');

    if (headerApiKey !== apiKey) {
      throw new RpcException(responseHttpErrorMessage[HttpStatus.UNAUTHORIZED]);
    }

    return true;
  }
}
