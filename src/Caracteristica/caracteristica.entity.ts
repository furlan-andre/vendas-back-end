import { Produto } from 'src/Produto/produto.entity';
import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("Caracteristicas")
export class Caracteristica {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100})  
  Nome: string;

  @Column({ length: 50})
  Valor: string;

  @ManyToOne(() => Produto, (produto) => produto.Caracteristicas )
  Produto: Produto;
}
