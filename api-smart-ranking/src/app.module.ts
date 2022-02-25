import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { ServerApiVersion } from 'mongodb';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:rootTESTapi@cluster0.zvvh9.mongodb.net/smartranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
