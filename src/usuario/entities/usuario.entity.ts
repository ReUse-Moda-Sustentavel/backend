import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}