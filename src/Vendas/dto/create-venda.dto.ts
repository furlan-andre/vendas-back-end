import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ClienteDto } from "src/Cliente/dto/clientes.dto";
import { VendaItemDto } from "src/VendaItem/dto/venda-item.dto";

export class CreateVendaDto {        
    // @IsString({message: "A descricao deve ser informada (string)"})
    descricao: string;
    
    // @IsNotEmpty({message: "Os itens devem ser informados"})
    // @ValidateNested({ each:true}) 
    // @Type(() => VendaItemDto)   
    itens: VendaItemDto[]

    // @IsNotEmpty({message: "O cliente deve ser informado"})    
    // @ValidateNested({ each:true}) 
    // @Type(() => ClienteDto)   
    cliente: ClienteDto
}
