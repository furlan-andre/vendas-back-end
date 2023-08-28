import { Vendas } from 'src/vendas/entities/venda.entity';
import { Entity, Column,  PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("VendaItem")
export class VendaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true})  
  descricao?: string;

  @Column({ type: "decimal" })  
  quantidade: number;

  @Column({ type: "decimal" })  
  valor_unitario: number;
  
  @Column({ type: "decimal" })  
  valor_total: number;

  @ManyToOne(() => Vendas, (vendas) => vendas.itens )
  venda: Vendas;
}
