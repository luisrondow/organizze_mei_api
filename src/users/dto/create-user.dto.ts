import { Allow } from 'class-validator/decorator/decorators';

export class CreateUserDto {
  @Allow()
  email: string;
  name: string;
  cnpj: string;
  password: string;
  passwordConfirmation: string;
}
