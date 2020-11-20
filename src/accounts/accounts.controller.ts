import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport/dist';
import { Account } from './account.entity';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
// @UseGuards(AuthGuard())
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get(':id')
  async findAll(@Param('id') id): Promise<{ accounts: Account[] }> {
    const accounts = await this.accountsService.findAll(id);

    return { accounts };
  }

  @Post()
  async create(
    @Body(ValidationPipe) createAccountDto: CreateAccountDto,
  ): Promise<{ account: Account }> {
    const account = await this.accountsService.create(createAccountDto);

    return { account };
  }

  @Put(':id')
  async update(
    @Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
    @Param('id') id: string,
  ): Promise<{ account: Account }> {
    const account = await this.accountsService.update(updateAccountDto, id);

    return { account };
  }
}
