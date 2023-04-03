import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiKeyGuard } from 'src/guards/api-key.guard';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(ApiKeyGuard)
  @MessagePattern('createProduct')
  async create(@Payload() productDto: ProductDto) {
    return await this.productsService.create(productDto);
  }
}
