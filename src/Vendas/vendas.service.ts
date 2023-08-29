import { VendaItem } from 'src/VendaItem/entities/venda-item.entity';
import { Inject, Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { Cliente } from 'src/Cliente/clientes.entity';
import { Repository } from 'typeorm';
import { CreateVendaDto } from './dto/create-venda.dto';
import { Vendas } from './entities/venda.entity';
import { ProdutoService } from 'src/Produto/produto.service';
import { cpf } from 'cpf-cnpj-validator'; 

@Injectable()
export class VendasService {  
  constructor( 
    @Inject('VENDAS_REPOSITORY')
    private vendasRepository: Repository<Vendas>
   ){    
  }

  obterData(): string {
    const data = new Date();
    const retorno = data.toISOString().slice(0,10) + ' ' + data.toLocaleTimeString("pt-br");

    return retorno;
  }
  
  async cadastrar(createVendaDto: CreateVendaDto, produtoService: ProdutoService) {          
    const vendas = await this.montarVenda(createVendaDto, produtoService);  
    this.validaInconsistencia(vendas);  
    
    const retorno = await this.vendasRepository.save(vendas);
    if(retorno)
      return HttpStatus.OK;
  }

  private validaInconsistencia(venda: Vendas) {
    if(!venda.itens || venda.itens.length === 0)
      throw new BadRequestException('Itens são obrigatórios');

    if(!venda.cliente || venda.cliente?.cpf || venda.cliente?.email || venda.cliente?.nome)
      throw new BadRequestException(`Os dados do cliente são obrigatórios`);  

    if(venda.cliente.cpf) {
      const valorCpf = venda.cliente.cpf;
      if(!cpf.isValid(valorCpf))
        throw new BadRequestException(`O cpf informado é inválido`);  
    }

    if(!venda.cliente.email.includes('@') && !venda.cliente.email.includes('.'))
      throw new BadRequestException(`O email informado é inválido`);  

    return false;
  }

  async montarVenda(createVendaDto: CreateVendaDto, produtoService: ProdutoService): Promise<Vendas> {
    const vendas = new Vendas();      
    vendas.data_venda = this.obterData();

    if(createVendaDto.descricao)
      vendas.descricao = createVendaDto.descricao;

    vendas.itens = new Array<VendaItem>();    

    if(createVendaDto.itens && createVendaDto.itens.length > 0){         
      for (const item of createVendaDto.itens) {
        const vendaItem = new VendaItem();    
                
        const produto = await produtoService.obterPorId(item.produtoId);
        if(!produto)
          throw new BadRequestException(`O produto com produtoId:${item.produtoId} não foi encontrado`);
        
        if(produto.Descricao)
          vendaItem.descricao = produto.Descricao;

        vendaItem.valor_unitario = produto.ValorDeVenda;
        vendaItem.quantidade = item.quantidade;        
        vendaItem.valor_total =  (Number) ((vendaItem.valor_unitario * vendaItem.quantidade ).toFixed(2));

        vendas.itens.push(vendaItem);
      }
    }

    vendas.valor_total = vendas.itens.reduce((total, item) => total += item.valor_total, 0);

    const cliente = new Cliente();
    
    cliente.cpf = createVendaDto.cliente.cpf;
    cliente.nome = createVendaDto.cliente.nome;
    cliente.email = createVendaDto.cliente.email;

    vendas.cliente = cliente;

    return vendas;
  }

  listar() {    
    return this.vendasRepository.find({relations:  { cliente: true, itens: true }});    
  }

  async obterPorId(id: number): Promise<Vendas> {
    return this.vendasRepository.findOne({
        where :{ id: id}        
    });
}
}
