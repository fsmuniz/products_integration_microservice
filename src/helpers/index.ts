import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/types/enviroments.types';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

export class Helper {
  configService: ConfigService<Record<string, unknown>, false>;
  logger: Logger;

  constructor() {
    this.configService = new ConfigService();
    this.logger = new Logger(Helper.name);
  }

  getEnviroment(): Environment {
    return {
      nodeEnv: this.configService.get('NODE_ENV'),
      port: this.configService.get('PORT') || 3000,
      postGresHost: this.configService.get('POSTGRES_HOST'),
      postgresPort: this.configService.get('POSTGRES_PORT'),
      postGresUser: this.configService.get('POSTGRES_USER'),
      postGresPassword: this.configService.get('POSTGRES_PASSWORD'),
      postGresDatabase: this.configService.get('POSTGRES_DB'),
      rabbitMqUser: this.configService.get('RABBITMQ_USER'),
      rabbitMqPassword: this.configService.get('RABBITMQ_PASSWORD'),
      rabbitMqHost: this.configService.get('RABBITMQ_HOST'),
      rabbitMqPort: this.configService.get('RABBITMQ_PORT'),
      rabbitMqQueueName: this.configService.get('RABBITMQ_QUEUE_NAME'),
      productMicroservicesToken: this.configService.get('PRODUCT_MICROSERVICE_TOKEN')
    };
  }

  getFormatedRpcExceptionMessage(message: any, error: any) {
    return {
      ...message,
      ...(this.configService.get('NODE_ENV') === 'development' && {
        message: `${message?.message} -> ${error?.detail})`
      })
    };
  }

  makeProductCode(url: string) {
    const urlRemovedParamsurl = url.split('?')[0];

    return urlRemovedParamsurl.substring(urlRemovedParamsurl.length - 12);
  }

  async getProductProps(url: string) {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const code = this.makeProductCode(url);

    let originalPrice = (Number($('default-price .reduce').text()) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const discountPrice = $('del.default-price.reduce').text();

    const title = $('title').text();
    const previewImgLink = $('img.zoom').attr('src');
    const description = $('p[itemprop="description"]').text();

    if (originalPrice === 'R$ 0,00') {
      originalPrice = (Number($('#hiddenPriceSaleInCents').attr('value')) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }

    return {
      code,
      previewImgLink,
      title,
      description,
      originalPrice,
      discountPrice
    };
  }
}
