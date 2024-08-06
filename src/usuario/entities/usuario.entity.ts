import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    usuario: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    senha: string;

    @IsNotEmpty()
    @Column({ length: 500, nullable: true })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    foto: string;

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty()
    tipoUsuario: string;

    @ApiProperty()
    @OneToMany(() => Produto, (produto) => produto.usuario)
    produto: Produto[]
}
