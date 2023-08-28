import { DataSource } from 'typeorm';
import { Vendas } from './entities/venda.entity';

export const vendasProviders = [
  {
    provide: 'VENDAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vendas),
    inject: ['DATA_SOURCE'],
  },
];