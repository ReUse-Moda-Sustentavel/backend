import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({ name: "tb_usuarios" })
export class Usuario {
   
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    conta: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    nome: string;
    
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    senha: string;

    @IsNotEmpty()
    @Column({length: 500, nullable: true})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    foto: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    tipoUsuario: string;
   
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto []
}
