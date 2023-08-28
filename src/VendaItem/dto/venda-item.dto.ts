import { IsNotEmpty, IsNumber } from "class-validator";

export class VendaItemDto {       
    @IsNotEmpty({ message: "O produtoId deve ser preenchido"})   
    produtoId: number;
        
    @IsNumber({}, {message: "A quantidade deve ser preenchida (number)"})
    quantidade: number;
}
