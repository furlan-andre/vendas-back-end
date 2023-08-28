import { IsEmail, IsString } from "class-validator";

export class ClienteDto {       
    @IsString({message: 'O nome deve ser preenchido (string)'})
    nome: string;
    
    @IsString({message: 'O cpf deve ser preenchido (string)'})
    cpf: string;

    @IsEmail({}, {message: 'É necessário informar um email válido'})
    email?: string;
}
