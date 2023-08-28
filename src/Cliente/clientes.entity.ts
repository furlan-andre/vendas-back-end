import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cliente")
export class Cliente {  
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ length: 100})  
  nome: string;

  @Column({ length: 15})
  cpf: string;

  @Column({ length: 50})
  email: string;
}