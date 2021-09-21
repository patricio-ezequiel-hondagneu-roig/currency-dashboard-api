import {Entity, model, property} from '@loopback/repository';

@model()
export class Exchanger extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  script: string;

  @property({
    type: 'number',
  })
  coinId?: number;

  constructor(data?: Partial<Exchanger>) {
    super(data);
  }
}

export interface ExchangerRelations {
  // describe navigational properties here
}

export type ExchangerWithRelations = Exchanger & ExchangerRelations;
