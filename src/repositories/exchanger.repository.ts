import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalVolatileDataSource} from '../datasources';
import {Exchanger, ExchangerRelations} from '../models';

export class ExchangerRepository extends DefaultCrudRepository<
  Exchanger,
  typeof Exchanger.prototype.id,
  ExchangerRelations
> {
  constructor(
    @inject('datasources.local_volatile') dataSource: LocalVolatileDataSource,
  ) {
    super(Exchanger, dataSource);
  }
}
