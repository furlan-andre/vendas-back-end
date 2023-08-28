import { ProdutoService } from './../Produto/produto.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';

@Controller('Venda')
export class VendasController {
  constructor(private readonly vendasService: VendasService,
              private readonly produtoService: ProdutoService) {}

  @Post()
  criar(@Body() createVendaDto: CreateVendaDto) {
    return this.vendasService.cadastrar(createVendaDto, this.produtoService);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  listar() {
    return this.vendasService.listar();
  }

  @Get(':id')
  obterPorId(@Param('id') id: string) {
    return this.vendasService.obterPorId(+id);
  }
}
