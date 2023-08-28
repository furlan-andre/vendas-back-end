import { IsNotEmpty } from "class-validator";

export class CaracteristicaDto {   
    @IsNotEmpty({ message: "O produtoId deve ser preenchido"})   
    produtoId: number;   
    
    @IsNotEmpty({ message: "O nome deve ser preenchido"})   
    nome: string;
    
    @IsNotEmpty({ message: "O valor deve ser preenchido"})
    valor: string;
}
