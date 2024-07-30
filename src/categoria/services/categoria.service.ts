import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations: { produto: true },
        })
        
    }

    async findById(id: number): Promise<Categoria>{

        let categoria = await this.categoriaRepository.findOne({
            where: {id},
            relations: { produto: true },
        })

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return categoria;
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {nome: ILike(`%${nome}%`)},
            relations: { produto: true },
        })
    }

    async findByGenero(genero: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {genero: ILike(`%${genero}%`)},
            relations: { produto: true },
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria)
        
    }

    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id);

        if (!categoria.id)
            throw new HttpException('Necessário passar ID da categoria a ser atualizada!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }
}