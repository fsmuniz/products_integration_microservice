import { CacheModule, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Helper } from 'src/helpers';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsService } from 'src/modules/products/products.service';
import { product } from 'src/__tests__/stubs/product.stubs';

export const rabbitMqClientMock = {
  send: jest.fn()
};

export const productServiceConfigTestOptions = {
  imports: [CacheModule.register()],
  controllers: [ProductsController],
  providers: [
    ConfigService,
    ProductsService,
    Helper,
    {
      provide: getRepositoryToken(Product),
      useValue: {
        findOne: jest.fn().mockReturnValue(product),
        insert: jest.fn().mockReturnValue(product),
        save: jest.fn().mockReturnValue(product)
      }
    },
    Logger
  ]
};
