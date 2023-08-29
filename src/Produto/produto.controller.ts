import { AtualizarProdutosDto } from './dto/atualizar-produtos.dto';
import { Body, Controller, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CriarProdutoDto } from "./dto/criar-produtos.dto";
import { Produto } from "./produto.entity";
import { ProdutoService } from "./produto.service";

@ApiTags('Produto')
@Controller("Produto")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {     
  }

  @Post()  
  @HttpCode(201)
  async cadastrar(@Body() produtoDto: CriarProdutoDto){        
      return this.produtoService.cadastrar(produtoDto);
  }

  @Get()  
  async listar(): Promise<Produto[]> {
    return this.produtoService.listar();
  }

  @Get(':id')
  async obterPorId(@Param('id') id: number){
    return this.produtoService.obterPorId(+id);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: number, @Body() atualizarProdutosDto: AtualizarProdutosDto){
    return this.produtoService.atualizar(+id, atualizarProdutosDto)
  }
}