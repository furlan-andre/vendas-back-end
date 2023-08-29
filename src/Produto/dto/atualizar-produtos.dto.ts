import { TipoDeProdutoEnum } from 'src/Enums/tipoDeProdutoEnum';
import { CaracteristicaDto } from 'src/Caracteristica/dto/caracteristica.dto';

export class AtualizarProdutosDto {
    nome?: string;        
    descricao?: string;
    valorDeVenda?: number;  
    tipo?: TipoDeProdutoEnum;    
    linkParaDownload?: string;
    caracteristicas?: Array<CaracteristicaDto>;
    agrupamento?: number[];
}