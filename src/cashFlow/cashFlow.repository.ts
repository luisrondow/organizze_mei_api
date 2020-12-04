import { EntityRepository, Repository } from 'typeorm';
import { CashFlow } from './cashFlow.entity';

@EntityRepository(CashFlow)
export class CashFlowRepository extends Repository<CashFlow> {}
