import { ProdutoModule } from './../Produto/produto.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { vendasProviders } from './vendas.provider';

@Module({
  imports:[DatabaseModule, ProdutoModule],
  controllers: [VendasController],
  providers: [
    ...vendasProviders,
    VendasService],
})
export class VendasModule {}
