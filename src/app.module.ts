import { Module } from '@nestjs/common';
import { ProdutoModule } from './Produto/produto.module';
import { VendasModule } from './vendas/vendas.module';

@Module({
  imports: [ProdutoModule, VendasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
