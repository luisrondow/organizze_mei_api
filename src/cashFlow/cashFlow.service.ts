import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from 'src/accounts/accounts.repository';
import { UserRepository } from 'src/users/users.repository';
import { CashFlow } from './cashFlow.entity';
import { CashFlowRepository } from './cashFlow.repository';
import { CreateCashFlowDto } from './dto/create-cashFlow.dto';

@Injectable()
export class CashFlowService {
  constructor(
    @InjectRepository(AccountRepository)
    @InjectRepository(CashFlowRepository)
    @InjectRepository(UserRepository)
    private accountRepository: AccountRepository,
    private cashFlowRepository: CashFlowRepository,
    private userRepository: UserRepository,
  ) {}

  async find(accountId: string): Promise<CashFlow[]> {
    const cashFlows = await this.cashFlowRepository.find({
      where: [
        {
          accountId,
        },
      ],
    });

    return cashFlows;
  }

  async findAll(userId: string): Promise<CashFlow[]> {
    const accounts = await this.accountRepository.find({
      where: [
        {
          userId,
        },
      ],
    });
    const allCashFlows = [];

    for (const account of accounts) {
      const cashFlows = await this.cashFlowRepository.find({
        where: [
          {
            accountId: account.id,
          },
        ],
        relations: ['account'],
      });

      allCashFlows.push(...cashFlows);
    }

    return allCashFlows;
  }

  async create(createCashFlowDto: CreateCashFlowDto): Promise<CashFlow> {
    const {
      description,
      price,
      category,
      date,
      moreInfos,
      accountId,
      type,
    } = createCashFlowDto;
    const [account] = await this.accountRepository.findByIds([accountId]);
    const cashFlow = this.cashFlowRepository.create();
    cashFlow.description = description;
    cashFlow.price = price;
    cashFlow.category = category;
    cashFlow.date = new Date(date);
    cashFlow.moreInfos = moreInfos;
    cashFlow.type = type;
    cashFlow.account = account;
    cashFlow.accountId = accountId;

    try {
      await cashFlow.save();

      return cashFlow;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o fluxo de caixa no banco de dados: ' + error,
      );
    }
  }

  async delete(cashFlowId: string) {
    const result = await this.cashFlowRepository.delete({ id: cashFlowId });
    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um usuário com o ID informado',
      );
    }
  }
}
