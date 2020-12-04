import { Account } from 'src/accounts/account.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class CashFlow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  description: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  type: string;

  @ManyToOne((type) => Account, (account) => account.cashFlows)
  account: Account;

  @Column({ nullable: false })
  accountId: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  category: string;

  @Column({ nullable: false, type: 'varchar', length: 2000 })
  moreInfos: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
