import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_categorias" })
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    nome: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: true})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    genero: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produto: Produto[]
}