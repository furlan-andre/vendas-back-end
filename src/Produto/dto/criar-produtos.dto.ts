import { TipoDeProdutoEnum } from 'src/Enums/tipoDeProdutoEnum';
import { CaracteristicaDto } from '../../Caracteristica/dto/caracteristica.dto';

export class CriarProdutoDto {   
    nome: string;
    descricao?: string;
    valorDeVenda: number;
    tipo: TipoDeProdutoEnum;
    linkParaDownload?: string;
    caracteristicas?: Array<CaracteristicaDto>;
    agrupamento?: number[];
}

