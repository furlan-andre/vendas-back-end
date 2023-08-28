import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TipoDeProdutoEnum } from 'src/Enums/tipoDeProdutoEnum';
import { CaracteristicaDto } from 'src/Caracteristica/dto/caracteristica.dto';

export class AtualizarProdutosDto {
    @IsOptional()
    @IsString({ message: "O nome deve ser uma string"})
    @IsNotEmpty({ message: "O nome deve ser preenchido"})
    nome?: string;    
    
    @IsOptional()
    @IsString({message: "A descricao deve ser uma string"})
    descricao?: string;
    
    @IsOptional()
    @IsNumber({}, {message: "O valorDeVenda deve ser um numeral"})
    @IsNotEmpty({ message: "O valorDeVenda deve ser preenchido"})
    @Min(1, {message: "O valorDeVenda deve ser válido"})
    valorDeVenda?: number;
    
    @IsOptional()
    @IsEnum(TipoDeProdutoEnum, {message: "O tipo deve ser dos seguintes valores: Simples, Digital, Configurável, Agrupado"})
    tipo?: TipoDeProdutoEnum;
    
    @IsOptional()
    linkParaDownload?: string;
    
    @IsOptional()
    caracteristicas?: Array<CaracteristicaDto>;
}