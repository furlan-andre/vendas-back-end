import { ProdutoService } from './../Produto/produto.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, HttpCode } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Venda")
@Controller('Venda')
export class VendasController {
  constructor(private readonly vendasService: VendasService,
              private readonly produtoService: ProdutoService) {}

  
  /// <summary>
  ///   Cria uma nova venda.
  /// </summary>
  /// <param name="descricao">descrição da venda</param>
  /// <param name="itens">listagem dos itens da vend</param>
  /// <param name="cliente">cliente vinculado a vend</param>  
  /// <returns>Status OK</returns>
  @Post()
  @HttpCode(201)
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

