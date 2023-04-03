export type Environment = {
  nodeEnv: string;
  port: number;
  postGresHost: string;
  postgresPort: number;
  postGresUser: string;
  postGresPassword: string;
  postGresDatabase: string;
  rabbitMqUser: string;
  rabbitMqPassword: string;
  rabbitMqHost: string;
  rabbitMqPort: number;
  rabbitMqQueueName: string;
  productMicroservicesToken: string;
};

export type TResponseMessage = {
  [key: number | string]: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
};
