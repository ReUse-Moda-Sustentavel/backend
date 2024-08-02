import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@Controller("/produto")
export class ProdutoController{

    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findByNome(@Param("nome") nome: string): Promise<Produto[]> {
        return this.produtoService.findByNome(nome);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get("/tamanho/:tamanho")
    @HttpCode(HttpStatus.OK)
    findByGenero(@Param("tamanho") tamanho: string): Promise<Produto[]> {
        return this.produtoService.findByTamanho(tamanho);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/preco/maior/:preco")
    @HttpCode(HttpStatus.OK)
    findByPrecoMaior(@Param("preco") preco: number): Promise<Produto[]> {
        return this.produtoService.findByPrecoMaior(preco);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/preco/menor/:preco")
    @HttpCode(HttpStatus.OK)
    findByPrecoMenor(@Param("preco") preco: number): Promise<Produto[]> {
        return this.produtoService.findByPrecoMenor(preco);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }

}