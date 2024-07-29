import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{
    findByGenero(genero: string): Promise<Categoria[]> {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find()
    }

    async findById(id: number): Promise<Categoria>{

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            }
        })

        if (!categoria)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        return categoria;
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria)
        
    }

    async update(categoria: Categoria): Promise<Categoria> {
        await this.findById(categoria.id);

        if (!categoria.id)
            throw new HttpException('Necessário passar ID da categoria a ser atualizado!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }
}