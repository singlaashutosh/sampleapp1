import { Moment } from 'moment';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';

export interface IAccountEntity {
  id?: number;
  code?: number;
  accountEntityName?: string;
  description?: string;
  openingBalance?: number;
  closingBalance?: number;
  createdAt?: Moment;
  transactionEntities?: ITransactionEntity[];
}

export class AccountEntity implements IAccountEntity {
  constructor(
    public id?: number,
    public code?: number,
    public accountEntityName?: string,
    public description?: string,
    public openingBalance?: number,
    public closingBalance?: number,
    public createdAt?: Moment,
    public transactionEntities?: ITransactionEntity[]
  ) {}
}
