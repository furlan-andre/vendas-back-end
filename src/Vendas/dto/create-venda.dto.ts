import { ClienteDto } from "src/Cliente/dto/clientes.dto";
import { VendaItemDto } from "src/VendaItem/dto/venda-item.dto";

export class CreateVendaDto {            
    descricao: string;
    itens: VendaItemDto[]
    cliente: ClienteDto
}
