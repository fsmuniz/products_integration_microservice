import { Helper } from 'src/helpers';
import { Transport, RmqOptions } from '@nestjs/microservices';

const helper = new Helper();
const { rabbitMqUser, rabbitMqPassword, rabbitMqHost, rabbitMqPort, rabbitMqQueueName } = helper.getEnviroment();

export const rabbitMqConsumerConfig: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://${rabbitMqUser}:${rabbitMqPassword}@${rabbitMqHost}:${rabbitMqPort}`],
    queue: rabbitMqQueueName,
    queueOptions: {
      durable: true
    }
  }
};
