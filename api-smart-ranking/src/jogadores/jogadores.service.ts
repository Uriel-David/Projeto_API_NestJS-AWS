import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    
    private jogadores: Jogador[] = [];
    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}

    private readonly logger = new Logger(JogadoresService.name);
    
    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto;
        /* const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email); */
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado) {
            this.atualizar(criarJogadorDto);
        } else {
            await this.criar(criarJogadorDto);
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        /* return await this.jogadores; */
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadorModel.findOne({email}).exec();
        if(!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        
        return jogadorEncontrado;
    }

    async deletarJogador(email): Promise<any> {
        /* const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email);
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email); */

        return await this.jogadorModel.remove({email}).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const jogadorCriar = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriar.save();
        
        /* const { nome, telefoneCelular, email } = criarJogadorDto;
        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            telefoneCelular,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg',
        };
        this.logger.log(`criaJogadorDto ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador); */
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec();
        
        /* const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome; */
    }
}
