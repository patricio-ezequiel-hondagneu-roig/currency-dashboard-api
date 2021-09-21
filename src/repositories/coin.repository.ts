import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {LocalVolatileDataSource} from '../datasources';
import {Coin, CoinRelations, Exchanger} from '../models';
import {ExchangerRepository} from './exchanger.repository';

export class CoinRepository extends DefaultCrudRepository<
  Coin,
  typeof Coin.prototype.id,
  CoinRelations
> {

  public readonly exchangers: HasManyRepositoryFactory<Exchanger, typeof Coin.prototype.id>;

  constructor(
    @inject('datasources.local_volatile') dataSource: LocalVolatileDataSource,
    @repository.getter('ExchangerRepository') protected exchangerRepositoryGetter: Getter<ExchangerRepository>,
  ) {
    super(Coin, dataSource);
    this.exchangers = this.createHasManyRepositoryFactoryFor('exchangers', exchangerRepositoryGetter,);
    this.registerInclusionResolver('exchangers', this.exchangers.inclusionResolver);
  }
}
