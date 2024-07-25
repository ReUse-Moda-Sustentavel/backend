import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}