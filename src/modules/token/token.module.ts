import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token, TokenSchema } from '@models/token.model';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensRepository } from './token.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [TokenService, TokensRepository],
  exports: [TokensRepository, TokenService],
})
export class TokenModule {}
