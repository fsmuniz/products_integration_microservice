import { ConfigService } from '@nestjs/config';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsService } from 'src/modules/products/products.service';

export const rabbitMqClientMock = {
  send: jest.fn()
};

export const productControllerConfigTestOptions = {
  controllers: [ProductsController],
  providers: [
    ConfigService,
    ProductsService,
    { provide: 'PRODUCT_MODULE', useValue: rabbitMqClientMock },
    {
      provide: ProductsService,
      useValue: {
        create: jest.fn()
      }
    }
  ]
};
