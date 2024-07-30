import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: { categoria: true },
        })
    }

    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
            where: {id}
        })
        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        return produto;
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: { categoria: true },
        })
    }

    async findByTamanho(tamanho: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { tamanho: ILike(`%${tamanho}%`) },
            relations: { categoria: true },
        })
    }

    async findByPrecoMaior(valor: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { preco: MoreThanOrEqual(valor) },
            order: { preco: 'ASC' },
            relations: { categoria: true },
        });
    }
    async findByPrecoMenor(valor: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { preco: LessThanOrEqual(valor) },
            order: { preco: 'DESC' },
            relations: { categoria: true },
        });
    }

    async create(produto: Produto): Promise<Produto> {
        if (produto.categoria){
            await this.categoriaService.findById(produto.categoria.id)
            return await this.produtoRepository.save(produto)
        }
        return await this.produtoRepository.save(produto)

    }

    async update(produto: Produto): Promise<Produto> {
        await this.findById(produto.id);
        if (!produto.id)
            throw new HttpException('Necessário passar ID do produto a ser atualizado!', HttpStatus.NOT_FOUND);
        if (produto.categoria){
            await this.categoriaService.findById(produto.categoria.id)
            return await this.produtoRepository.save(produto)
        }
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.produtoRepository.delete(id);
    }
}