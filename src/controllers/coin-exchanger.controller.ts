import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Coin,
  Exchanger,
} from '../models';
import {CoinRepository} from '../repositories';

export class CoinExchangerController {
  constructor(
    @repository(CoinRepository) protected coinRepository: CoinRepository,
  ) { }

  @get('/coins/{id}/exchangers', {
    responses: {
      '200': {
        description: 'Array of Coin has many Exchanger',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Exchanger)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Exchanger>,
  ): Promise<Exchanger[]> {
    return this.coinRepository.exchangers(id).find(filter);
  }

  @post('/coins/{id}/exchangers', {
    responses: {
      '200': {
        description: 'Coin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Exchanger)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Coin.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchanger, {
            title: 'NewExchangerInCoin',
            exclude: ['id'],
            optional: ['coinId']
          }),
        },
      },
    }) exchanger: Omit<Exchanger, 'id'>,
  ): Promise<Exchanger> {
    return this.coinRepository.exchangers(id).create(exchanger);
  }

  @patch('/coins/{id}/exchangers', {
    responses: {
      '200': {
        description: 'Coin.Exchanger PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchanger, {partial: true}),
        },
      },
    })
    exchanger: Partial<Exchanger>,
    @param.query.object('where', getWhereSchemaFor(Exchanger)) where?: Where<Exchanger>,
  ): Promise<Count> {
    return this.coinRepository.exchangers(id).patch(exchanger, where);
  }

  @del('/coins/{id}/exchangers', {
    responses: {
      '200': {
        description: 'Coin.Exchanger DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Exchanger)) where?: Where<Exchanger>,
  ): Promise<Count> {
    return this.coinRepository.exchangers(id).delete(where);
  }
}
