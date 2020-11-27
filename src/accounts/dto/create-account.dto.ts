import { Allow } from 'class-validator/decorator/decorators';

export class CreateAccountDto {
  @Allow()
  name: string;
  bancoOrigem: string;
  saldoInicial: number;
  userId: string;
}
