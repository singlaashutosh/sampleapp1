import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransactionEntity, TransactionEntity } from 'app/shared/model/transaction-entity.model';
import { TransactionEntityService } from './transaction-entity.service';
import { TransactionEntityComponent } from './transaction-entity.component';
import { TransactionEntityDetailComponent } from './transaction-entity-detail.component';
import { TransactionEntityUpdateComponent } from './transaction-entity-update.component';

@Injectable({ providedIn: 'root' })
export class TransactionEntityResolve implements Resolve<ITransactionEntity> {
  constructor(private service: TransactionEntityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionEntity> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transactionEntity: HttpResponse<TransactionEntity>) => {
          if (transactionEntity.body) {
            return of(transactionEntity.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TransactionEntity());
  }
}

export const transactionEntityRoute: Routes = [
  {
    path: '',
    component: TransactionEntityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TransactionEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionEntityDetailComponent,
    resolve: {
      transactionEntity: TransactionEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TransactionEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionEntityUpdateComponent,
    resolve: {
      transactionEntity: TransactionEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TransactionEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionEntityUpdateComponent,
    resolve: {
      transactionEntity: TransactionEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'TransactionEntities',
    },
    canActivate: [UserRouteAccessService],
  },
];
