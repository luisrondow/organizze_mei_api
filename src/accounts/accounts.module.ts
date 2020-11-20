import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { AccountsController } from './accounts.controller';
import { AccountRepository } from './accounts.repository';
import { AccountsService } from './accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountRepository, UserRepository])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
