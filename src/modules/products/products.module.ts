import { CacheInterceptor, CacheModule, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Helper } from 'src/helpers';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CacheModule.register()],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ConfigService,
    Logger,
    Helper,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ]
})
export class ProductsModule {}
