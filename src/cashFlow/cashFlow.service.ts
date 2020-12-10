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

  async getReceitaByMonth(userId: string): Promise<any> {
    const accounts = await this.accountRepository.find({
      where: [
        {
          userId,
        },
      ],
    });
    const allCashFlows = [];

    for (const account of accounts) {
      const rawData = await this.cashFlowRepository.query(
        `SELECT "accountId", SUM(price) as receita, to_char(date_trunc('month', date), 'Mon') AS name  FROM cash_flow WHERE type = 'receita' GROUP BY name, "accountId"`,
      );

      const ownerFlows = rawData.filter(
        (data: { accountId: string }) => data.accountId === account.id,
      );

      ownerFlows.map((flow: { name: string; receita: any }) => {
        if (allCashFlows.some((e) => e.name === `${flow.name}/20`)) {
          allCashFlows.map((cash) => {
            if (cash.name === `${flow.name}/20`) {
              cash.receita += flow.receita;
            }
          });
        } else {
          flow.name = `${flow.name}/20`;
          allCashFlows.push(flow);
        }
      });
    }

    return allCashFlows;
  }

  async getDespesaByMonth(userId: string): Promise<any> {
    const accounts = await this.accountRepository.find({
      where: [
        {
          userId,
        },
      ],
    });
    const allCashFlows = [];

    for (const account of accounts) {
      const rawData = await this.cashFlowRepository.query(
        `SELECT "accountId", SUM(price) as despesa, to_char(date_trunc('month', date), 'Mon') AS name  FROM cash_flow WHERE type = 'despesa' GROUP BY name, "accountId"`,
      );

      const ownerFlows = rawData.filter(
        (data: { accountId: string }) => data.accountId === account.id,
      );

      ownerFlows.map((flow: { name: string; despesa: any }) => {
        if (allCashFlows.some((e) => e.name === `${flow.name}/20`)) {
          allCashFlows.map((cash) => {
            if (cash.name === `${flow.name}/20`) {
              cash.despesa += flow.despesa;
            }
          });
        } else {
          flow.name = `${flow.name}/20`;
          allCashFlows.push(flow);
        }
      });
    }

    return allCashFlows;
  }

  async getByCategory(userId: string): Promise<any> {
    const accounts = await this.accountRepository.find({
      where: [
        {
          userId,
        },
      ],
    });
    const allCashFlows = [];
    for (const account of accounts) {
      const rawData = await this.cashFlowRepository.query(
        `SELECT "accountId", SUM(price) as value, category AS name  FROM cash_flow WHERE type = 'despesa' GROUP BY name, "accountId"`,
      );

      const ownerFlows = rawData.filter(
        (data: { accountId: string }) => data.accountId === account.id,
      );

      ownerFlows.map((flow: { name: string; value: number }) => {
        if (allCashFlows.some((e) => e.name === flow.name)) {
          allCashFlows.map((cash) => {
            if (cash.name === flow.name) {
              cash.value += flow.value;
            }
          });
        } else {
          flow.name = flow.name;
          allCashFlows.push(flow);
        }
      });
    }
    return allCashFlows;
  }
}
