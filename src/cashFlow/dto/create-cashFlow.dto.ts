import { Allow } from 'class-validator/decorator/decorators';

export class CreateCashFlowDto {
  @Allow()
  description: string;
  price: number;
  date: string;
  type: string;
  accountId: string;
  category: string;
  moreInfos: string;
}
