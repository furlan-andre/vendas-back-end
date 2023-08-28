import { Cliente } from "src/Cliente/clientes.entity";
import { VendaItem } from "src/VendaItem/entities/venda-item.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Vendas")
export class Vendas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    data_venda: string;

    @Column({length: 100})
    descricao: string;
    
    @Column()  
    valor_total: number;

    @OneToOne(() => Cliente, {cascade : true})
    @JoinColumn()
    cliente: Cliente

    @OneToMany(() => VendaItem, (vendaItem) => vendaItem.venda, {cascade : true})  
    @JoinColumn()
    itens: VendaItem[]
}
