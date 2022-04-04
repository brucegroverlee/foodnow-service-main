import DomainEvent from '../domain/bus/DomainEvent';
import DomainEventSubscriber from '../domain/bus/DomainEventSubscriber';
import EventBus from '../domain/bus/EventBus';
import { rabbitmqApp } from './RabbitmqApp';
import DomainEventDTOMapper from '../infrastructure/DomainEventDTOMapper';
import DTO from '../infrastructure/DTO';

class RabbitMQEventBus<D extends DomainEvent, T extends DTO> implements EventBus {
  constructor(private domainEventMapper: DomainEventDTOMapper<D, T>) {}

  async publish(events: D[]): Promise<void> {
    events.forEach((event) => {
      rabbitmqApp.publish(event.eventName, this.domainEventMapper.toDTO(event));
    });
  }

  static addSubscribers(subscribers: DomainEventSubscriber[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((domainEvent) => {
        rabbitmqApp.subscribe(domainEvent, subscriber.on.bind(subscriber));
      });
    });
  }
}

export default RabbitMQEventBus;
