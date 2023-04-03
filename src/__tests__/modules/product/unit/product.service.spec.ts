import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from 'src/modules/products/entities/product.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { Repository } from 'typeorm';
import { productServiceConfigTestOptions } from './configs/product.service.config';
import { CACHE_MANAGER } from '@nestjs/common';
import { Helper } from 'src/helpers';
import { product, productCode, productDto, productScraping } from 'src/__tests__/stubs/product.stubs';
import { Cache } from 'cache-manager';

describe('ProductService', () => {
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  let cacheManager: Cache;
  let helper: Helper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(productServiceConfigTestOptions).compile();

    helper = module.get(Helper);
    productsService = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(helper).toBeDefined();
    expect(cacheManager).toBeDefined();
    expect(productsService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      jest.spyOn(helper, 'getProductProps').mockResolvedValue(productScraping);

      const result = await productsService.create(productDto);

      expect(result).toEqual(product);
      expect(helper.getProductProps).toHaveBeenCalledWith(productDto.url);
      expect(productRepository.save).toHaveBeenCalledWith(product);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        select: {
          id: true,
          code: true,
          title: true,
          description: true,
          discountPrice: true,
          originalPrice: true,
          previewImgLink: true
        },
        where: { code: product.code }
      });
    });

    it('should return a cached product', async () => {
      jest.spyOn(helper, 'makeProductCode').mockReturnValue(productCode);
      jest.spyOn(helper, 'getProductProps').mockResolvedValue(productScraping);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(cacheManager, 'get').mockResolvedValue(product);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

      const result = await productsService.create(productDto);

      expect(result).toEqual(product);
    });
  });
});
