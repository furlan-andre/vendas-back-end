import { IsOptional } from 'class-validator';
import { Caracteristica } from 'src/Caracteristica/caracteristica.entity';
import { TipoDeProdutoEnum } from 'src/Enums/tipoDeProdutoEnum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity("Produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ length: 100, unique: true })  
  Nome: string;

  @Column({ length: 255, nullable: true })
  Descricao?: string;
  
  @Column({ type: "decimal" })  
  ValorDeVenda: number;

  @Column({ length:50 })
  Tipo: TipoDeProdutoEnum;
  
  @IsOptional()
  LinkParaDownload?: string;

  @OneToMany(() => Caracteristica, (caracteristica) => caracteristica.Produto, {cascade : true})  
  @JoinColumn()
  Caracteristicas: Caracteristica[]
      
  @ManyToOne((type) => Produto, (produto) => produto.Agrupamento)
  Agrupado: Produto

  @OneToMany((type) => Produto, (produto) => produto.Agrupado)
  Agrupamento: Produto[]
}
