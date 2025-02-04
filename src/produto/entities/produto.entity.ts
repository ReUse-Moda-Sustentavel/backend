import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_produtos" })
export class Produto {
    @ApiProperty() 
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    nome: string;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length: 255, nullable: true})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    tamanho: string;

    @ApiProperty() 
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 6, scale: 2})
    preco: number;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length: 255, nullable: true})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    descricao: string;

    @ApiProperty() 
    @IsNotEmpty()
    @Column({length: 500, nullable: true})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    foto: string;

    @ApiProperty({type: () => Categoria}) 
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    @ApiProperty({type: () => Usuario}) 
    @ManyToOne(() => Usuario, (usuario) => usuario.produto,{
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}

