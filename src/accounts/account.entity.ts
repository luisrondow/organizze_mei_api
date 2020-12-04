import { CashFlow } from 'src/cashFlow/cashFlow.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false })
  bancoOrigem: string;

  @Column({ nullable: false, type: 'float' })
  saldo: number;

  @OneToMany((type) => CashFlow, (cashFlow) => cashFlow.account)
  cashFlows: CashFlow[];

  @ManyToOne((type) => User, (user) => user.accounts)
  user: User;

  @Column({ nullable: false })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
