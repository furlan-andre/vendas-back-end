import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProdutoService } from './produto.service';
import { produtoProviders } from './produto.providers';
import { ProdutoController } from './produto.controller';


@Module({
  imports: [
    DatabaseModule        
  ],
  controllers: [ProdutoController],
  providers: [
    ... produtoProviders,
    ProdutoService    
  ],
  exports:[ProdutoService]
})
export class ProdutoModule {}
