import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';

type EntityResponseType = HttpResponse<ITransactionEntity>;
type EntityArrayResponseType = HttpResponse<ITransactionEntity[]>;

@Injectable({ providedIn: 'root' })
export class TransactionEntityService {
  public resourceUrl = SERVER_API_URL + 'api/transaction-entities';

  constructor(protected http: HttpClient) {}

  create(transactionEntity: ITransactionEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionEntity);
    return this.http
      .post<ITransactionEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transactionEntity: ITransactionEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionEntity);
    return this.http
      .put<ITransactionEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransactionEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransactionEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transactionEntity: ITransactionEntity): ITransactionEntity {
    const copy: ITransactionEntity = Object.assign({}, transactionEntity, {
      transDate:
        transactionEntity.transDate && transactionEntity.transDate.isValid() ? transactionEntity.transDate.format(DATE_FORMAT) : undefined,
      entryDate: transactionEntity.entryDate && transactionEntity.entryDate.isValid() ? transactionEntity.entryDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.transDate = res.body.transDate ? moment(res.body.transDate) : undefined;
      res.body.entryDate = res.body.entryDate ? moment(res.body.entryDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transactionEntity: ITransactionEntity) => {
        transactionEntity.transDate = transactionEntity.transDate ? moment(transactionEntity.transDate) : undefined;
        transactionEntity.entryDate = transactionEntity.entryDate ? moment(transactionEntity.entryDate) : undefined;
      });
    }
    return res;
  }
}
