import ExpressApp from '../framework/express/ExpressApp';
import RabbitMQEventBus from '../framework/rabbitmq/RabbitMQEventBus';
import { rabbitmqApp } from '../framework/rabbitmq/RabbitmqApp';
import { sequelizeApp } from '../framework/sequelize/SequelizeApp';

/* import swaggerRouter from '../framework/swagger/swaggerRouter';
import deliveryRouter from '../contexts/delivery/infrastructure/express/router';
import deliverySubscribers from '../contexts/delivery/infrastructure/subscribers';
import carrierRouter from '../contexts/carrier/infrastructure/express/router';
import carrierSubscribers from '../contexts/carrier/infrastructure/subscribers'; */

const httpServer = new ExpressApp([
  /* swaggerRouter, deliveryRouter, carrierRouter */
]);

/* RabbitMQEventBus.addSubscribers(deliverySubscribers);
RabbitMQEventBus.addSubscribers(carrierSubscribers); */

httpServer.start([sequelizeApp.connect(), rabbitmqApp.connect()]);

export { httpServer };
