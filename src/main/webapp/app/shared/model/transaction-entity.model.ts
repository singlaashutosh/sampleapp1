import { Moment } from 'moment';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { TransType } from 'app/shared/model/enumerations/trans-type.model';

export interface ITransactionEntity {
  id?: number;
  transAmmount?: number;
  transDate?: Moment;
  transType?: TransType;
  entryDate?: Moment;
  accountEntity?: IAccountEntity;
}

export class TransactionEntity implements ITransactionEntity {
  constructor(
    public id?: number,
    public transAmmount?: number,
    public transDate?: Moment,
    public transType?: TransType,
    public entryDate?: Moment,
    public accountEntity?: IAccountEntity
  ) {}
}
