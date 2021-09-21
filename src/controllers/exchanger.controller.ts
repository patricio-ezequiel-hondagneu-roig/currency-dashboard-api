import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Exchanger} from '../models';
import {ExchangerRepository} from '../repositories';

export class ExchangerController {
  constructor(
    @repository(ExchangerRepository)
    public exchangerRepository : ExchangerRepository,
  ) {}

  @post('/exchangers')
  @response(200, {
    description: 'Exchanger model instance',
    content: {'application/json': {schema: getModelSchemaRef(Exchanger)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchanger, {
            title: 'NewExchanger',
            exclude: ['id'],
          }),
        },
      },
    })
    exchanger: Omit<Exchanger, 'id'>,
  ): Promise<Exchanger> {
    return this.exchangerRepository.create(exchanger);
  }

  @get('/exchangers/count')
  @response(200, {
    description: 'Exchanger model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Exchanger) where?: Where<Exchanger>,
  ): Promise<Count> {
    return this.exchangerRepository.count(where);
  }

  @get('/exchangers')
  @response(200, {
    description: 'Array of Exchanger model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Exchanger, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Exchanger) filter?: Filter<Exchanger>,
  ): Promise<Exchanger[]> {
    return this.exchangerRepository.find(filter);
  }

  @patch('/exchangers')
  @response(200, {
    description: 'Exchanger PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchanger, {partial: true}),
        },
      },
    })
    exchanger: Exchanger,
    @param.where(Exchanger) where?: Where<Exchanger>,
  ): Promise<Count> {
    return this.exchangerRepository.updateAll(exchanger, where);
  }

  @get('/exchangers/{id}')
  @response(200, {
    description: 'Exchanger model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Exchanger, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Exchanger, {exclude: 'where'}) filter?: FilterExcludingWhere<Exchanger>
  ): Promise<Exchanger> {
    return this.exchangerRepository.findById(id, filter);
  }

  @patch('/exchangers/{id}')
  @response(204, {
    description: 'Exchanger PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Exchanger, {partial: true}),
        },
      },
    })
    exchanger: Exchanger,
  ): Promise<void> {
    await this.exchangerRepository.updateById(id, exchanger);
  }

  @put('/exchangers/{id}')
  @response(204, {
    description: 'Exchanger PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() exchanger: Exchanger,
  ): Promise<void> {
    await this.exchangerRepository.replaceById(id, exchanger);
  }

  @del('/exchangers/{id}')
  @response(204, {
    description: 'Exchanger DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.exchangerRepository.deleteById(id);
  }
}
