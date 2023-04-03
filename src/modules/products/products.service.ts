import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { responsePgErrorMessage } from 'src/constants/pg-responses.constant';
import { Helper } from 'src/helpers';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly logger: Logger,
    private readonly helper: Helper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(productDto: ProductDto) {
    try {
      const { url } = productDto;

      const productCode = this.helper.makeProductCode(url);

      const cachedProduct = await this.cacheManager.get(productCode);
      const productCreate = await this.helper.getProductProps(url);

      if (cachedProduct) {
        this.logger.log(`return cached item`);
        return cachedProduct;
      }

      let product = await this.productRepository.findOne({
        select: {
          id: true,
          code: true,
          title: true,
          description: true,
          discountPrice: true,
          originalPrice: true,
          previewImgLink: true
        },
        where: {
          code: productCode
        }
      });

      if (!product) {
        this.logger.log('item inserted in database');
        product = await this.productRepository.save(productCreate);
      } else {
        this.logger.warn(`find item from database where:`, {
          code: productCode
        });
        this.logger.log('item updated in database');

        product = await this.productRepository.save({ ...productCreate, id: product.id });
      }

      // item persist one hour in cache
      await this.cacheManager.set(productCode, product, 60000);

      this.logger.log(`return database item`);
      return product;
    } catch (error) {
      this.logger.error(error);

      const pgResponse = responsePgErrorMessage[error?.code || 'unknown'];
      throw new RpcException(this.helper.getFormatedRpcExceptionMessage(pgResponse, error));
    }
  }
}
