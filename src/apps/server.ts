import ExpressApp from '../framework/express/ExpressApp';
import RabbitMQEventBus from '../framework/rabbitmq/RabbitMQEventBus';
import { rabbitmqApp } from '../framework/rabbitmq/RabbitmqApp';
import { sequelizeApp } from '../framework/sequelize/SequelizeApp';

import swaggerRouter from '../framework/swagger/swaggerRouter';
import authModule from '../contexts/auth/authModule';

const httpServer = new ExpressApp([swaggerRouter, authModule.router]);

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
