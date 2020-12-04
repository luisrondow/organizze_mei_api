import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CashFlow } from './cashFlow.entity';
import { CashFlowService } from './cashFlow.service';
import { CreateCashFlowDto } from './dto/create-cashFlow.dto';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private cashFlowService: CashFlowService) {}

  @Get(':id')
  async find(@Param('id') id): Promise<{ cashFlow: CashFlow[] }> {
    const cashFlow = await this.cashFlowService.find(id);

    return { cashFlow };
  }

  @Get('/all/:id')
  async findAll(@Param('id') id): Promise<{ cashFlow: CashFlow[] }> {
    const cashFlow = await this.cashFlowService.findAll(id);

    return { cashFlow };
  }

  @Post()
  async create(
    @Body(ValidationPipe) createCashFlowDto: CreateCashFlowDto,
  ): Promise<{ cashFlow: CashFlow }> {
    const cashFlow = await this.cashFlowService.create(createCashFlowDto);

    return { cashFlow };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.cashFlowService.delete(id);
  }
}
