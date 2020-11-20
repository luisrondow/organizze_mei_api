import { Allow } from 'class-validator/decorator/decorators';

export class CreateAccountDto {
  @Allow()
  name: string;
  bancoOrigem: string;
  saldoIncial: number;
  userId: string;
}
