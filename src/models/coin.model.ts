import {Entity, model, property, hasMany} from '@loopback/repository';
import {Exchanger} from './exchanger.model';

@model()
export class Coin extends Entity {
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
  acronym: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  wikipediaUrl?: string;

  @hasMany(() => Exchanger)
  exchangers: Exchanger[];

  constructor(data?: Partial<Coin>) {
    super(data);
  }
}

export interface CoinRelations {
  // describe navigational properties here
}

export type CoinWithRelations = Coin & CoinRelations;
