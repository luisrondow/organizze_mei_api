import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { Account } from './account.entity';
import { AccountRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountRepository)
    @InjectRepository(UserRepository)
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
  ) {}

  async findAll(userId: string): Promise<Account[]> {
    const accounts = await this.accountRepository.find({
      where: [
        {
          userId,
        },
      ],
    });

    return accounts;
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { name, bancoOrigem, saldoIncial, userId } = createAccountDto;
    const [user] = await this.userRepository.findByIds([userId]);
    const account = this.accountRepository.create();
    account.name = name;
    account.bancoOrigem = bancoOrigem;
    account.saldo = saldoIncial;
    account.user = user;

    try {
      await account.save();

      return account;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a conta no banco de dados: ' + error,
      );
    }
  }

  async update(
    updateAccountDto: UpdateAccountDto,
    id: string,
  ): Promise<Account> {
    const { name, saldo } = updateAccountDto;
    const [account] = await this.accountRepository.findByIds([id]);

    account.name = name ?? account.name;
    account.saldo = saldo ?? account.saldo;

    try {
      await account.save();
      return account;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar a conta no banco de dados: ' + error,
      );
    }
  }
}
