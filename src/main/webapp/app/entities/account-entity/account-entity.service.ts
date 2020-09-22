import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAccountEntity } from 'app/shared/model/account-entity.model';

type EntityResponseType = HttpResponse<IAccountEntity>;
type EntityArrayResponseType = HttpResponse<IAccountEntity[]>;

@Injectable({ providedIn: 'root' })
export class AccountEntityService {
  public resourceUrl = SERVER_API_URL + 'api/account-entities';

  constructor(protected http: HttpClient) {}

  create(accountEntity: IAccountEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountEntity);
    return this.http
      .post<IAccountEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(accountEntity: IAccountEntity): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountEntity);
    return this.http
      .put<IAccountEntity>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAccountEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAccountEntity[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(accountEntity: IAccountEntity): IAccountEntity {
    const copy: IAccountEntity = Object.assign({}, accountEntity, {
      createdAt: accountEntity.createdAt && accountEntity.createdAt.isValid() ? accountEntity.createdAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((accountEntity: IAccountEntity) => {
        accountEntity.createdAt = accountEntity.createdAt ? moment(accountEntity.createdAt) : undefined;
      });
    }
    return res;
  }
}
