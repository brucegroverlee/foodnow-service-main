import DomainEvent from '../domain/bus/DomainEvent';
import DTO from './DTO';

interface DomainEventDTOMapper<D extends DomainEvent, T extends DTO> {
  toDTO(domainEntity: D): T;
  toDomain(dto: T): D;
}

export default DomainEventDTOMapper;
