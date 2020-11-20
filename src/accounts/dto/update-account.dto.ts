import { IsOptional } from 'class-validator/decorator/decorators';

export class UpdateAccountDto {
  @IsOptional()
  name: string;

  @IsOptional()
  saldo: number;
}
