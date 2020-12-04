import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFlowController } from './cashFlow.controller';
import { CashFlowRepository } from './cashFlow.repository';
import { CashFlowService } from './cashFlow.service';

@Module({
  imports: [TypeOrmModule.forFeature([CashFlowRepository])],
  providers: [CashFlowService],
  controllers: [CashFlowController],
})
export class CashFlowModule {}
