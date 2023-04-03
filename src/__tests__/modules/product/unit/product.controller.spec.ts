import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsService } from 'src/modules/products/products.service';
import { product, productDto } from 'src/__tests__/stubs/product.stubs';
import { productControllerConfigTestOptions } from './configs/product.controller.config';

describe('ProductController', () => {
  let productController: ProductsController;
  let productsService: ProductsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule(productControllerConfigTestOptions).compile();
    productController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and return it', async () => {
      jest.spyOn(productsService, 'create').mockResolvedValue(product);
      const result = await productController.create(productDto);
      expect(result).toBe(product);
      expect(productsService.create).toHaveBeenCalledWith(productDto);
    });
  });
});
