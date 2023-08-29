import { AtualizarProdutosDto } from './dto/atualizar-produtos.dto';
import { Injectable, Inject, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { Caracteristica } from 'src/Caracteristica/caracteristica.entity';
import { ValidaInconsistenciaProduto } from 'src/Validators/ValidaInconsistenciaProduto';
import { Repository } from 'typeorm';
import { CriarProdutoDto } from './dto/criar-produtos.dto';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @Inject('PRODUTO_REPOSITORIO')
        private produtoRepositorio: Repository<Produto>        
    ) { }

    async listar(): Promise<Produto[]> {
        return this.produtoRepositorio.find({
        relations: { Caracteristicas: true, Agrupamento: true, Agrupado: true },
        order: {Id: 'ASC'}
        });
    }

    async obterPorId(id: number): Promise<Produto> {
        return this.produtoRepositorio.findOne({
            where :{ Id: id},
            relations: { Caracteristicas: true, Agrupamento: true }
        });
    }

    async obterComAgrupadoPorId(id: number): Promise<Produto> {
        return this.produtoRepositorio.findOne({
            where :{ Id: id},
            relations: { Caracteristicas: true, Agrupado: true }
        });
    }

    async atualizar(id: number, produtoDto: AtualizarProdutosDto) {
        let produto = await this.produtoRepositorio.findOne({ where: { Id:id } });
        if(!produto)
            throw new BadRequestException('Produto não localizado');

        const criarProdutoDto = new CriarProdutoDto();
        
        criarProdutoDto.caracteristicas = produtoDto.caracteristicas;

        produto = await this.tratarAgrupamento(produto, criarProdutoDto);

        produto = this.atualizarProduto(produto, produtoDto);
        
        await this.valida(produto, this.produtoRepositorio);

        this.produtoRepositorio.save(produto);
    }
    
    atualizarProduto(produto: Produto, dto: AtualizarProdutosDto): Produto{        
        if (dto.nome)    
            produto.Nome = dto.nome;
        
        if (dto.descricao)
            produto.Descricao = dto.descricao;
        
        if (dto.tipo)
            produto.Tipo = dto.tipo;
        
        if (dto.linkParaDownload)
            produto.LinkParaDownload = dto.linkParaDownload;
        
        if (dto.valorDeVenda)
            produto.ValorDeVenda = dto.valorDeVenda;

        if (dto.caracteristicas && dto.caracteristicas.length > 0) {            
            produto.Caracteristicas = new Array<Caracteristica>();

            dto.caracteristicas.forEach(c => {
                const caracteristica = new Caracteristica();
                caracteristica.Nome = c.nome;
                caracteristica.Valor = c.valor;
                produto.Caracteristicas.push(caracteristica);
            });
        }

        return produto;
    }
    
    async obterPorNome(nome: string): Promise<Produto> {
        return this.produtoRepositorio.findOne({ where : {Nome: nome} });
    }

    async cadastrar(dto: CriarProdutoDto) {
        let produto = this.montaProduto(dto);        

        produto = await this.tratarAgrupamento(produto, dto);

        await this.valida(produto, this.produtoRepositorio);

        return this.armazena(produto, this.produtoRepositorio);
    }

    private async valida(produto: Produto, repositorio: Repository<Produto>) {
        const validaNomeUnico = await repositorio.findOne({ where : {Nome: produto.Nome} }); 
        if(validaNomeUnico && validaNomeUnico.Id != produto.Id)
            throw new BadRequestException(['Nome de produto já cadastrado']);

        const produtoPossuiInconsistencia = ValidaInconsistenciaProduto(produto);
        if(produtoPossuiInconsistencia)
            throw new BadRequestException([produtoPossuiInconsistencia]);
    }

    private async armazena(produto: Produto, repositorio: Repository<Produto>) {                
        const retorno = await repositorio.save(produto);        
        if(retorno)
            return HttpStatus.OK;
    }

    private async tratarAgrupamento(produto: Produto, produtoDto: CriarProdutoDto): Promise<Produto>{        
        if(produtoDto.agrupamento && produtoDto.agrupamento.length > 0){
            produto.Agrupamento = new Array<Produto>();

            for (const item of produtoDto.agrupamento) {
                const produtoParaAgrupar = await this.obterComAgrupadoPorId(item);

                if(!produtoParaAgrupar)
                    throw new BadRequestException(`Produto com produtoId:${item} não foi encontrado`);
            
                if(produtoParaAgrupar.Tipo !== 'Simples')    
                    throw new BadRequestException(`Produto com produtoId:${item} não é do tipo 'Simples'`);

                if(produtoParaAgrupar.Agrupado?.Id && produtoParaAgrupar.Agrupado.Id != produto.Id)    
                    throw new BadRequestException(`Produto com produtoId:${item} já se encontra agrupado`);

                produto.Agrupamento.push(produtoParaAgrupar);    
            }
        }

        return produto;
    }
    
    montaProduto(produtoDto: CriarProdutoDto): Produto {
        const produto = new Produto();
      
        if(produtoDto.nome)
            produto.Nome = produtoDto.nome;
        
        if(produtoDto.descricao)
            produto.Descricao = produtoDto.descricao;
        
        if(produtoDto.valorDeVenda)
            produto.ValorDeVenda = produtoDto.valorDeVenda;
        
        if(produtoDto.tipo)
            produto.Tipo = produtoDto.tipo;
    
        if(produtoDto.linkParaDownload)
            produto.LinkParaDownload = produtoDto.linkParaDownload;

        if(produtoDto.caracteristicas && produtoDto.caracteristicas.length > 0){                
            produto.Caracteristicas = new Array<Caracteristica>();
    
            produtoDto.caracteristicas.forEach(c => {
                const caracteristica = new Caracteristica();
                caracteristica.Nome = c.nome;
                caracteristica.Valor = c.valor;
                produto.Caracteristicas.push(caracteristica);
            });
        }

        return produto;
    }
}






