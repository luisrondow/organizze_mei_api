import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'src/accounts/accounts.repository';
import { UserRepository } from 'src/users/users.repository';
import { CashFlowController } from './cashFlow.controller';
import { CashFlowRepository } from './cashFlow.repository';
import { CashFlowService } from './cashFlow.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CashFlowRepository,
      UserRepository,
      AccountRepository,
    ]),
  ],
  providers: [CashFlowService],
  controllers: [CashFlowController],
})
export class CashFlowModule {}
