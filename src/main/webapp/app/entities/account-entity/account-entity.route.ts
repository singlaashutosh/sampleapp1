import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAccountEntity, AccountEntity } from 'app/shared/model/account-entity.model';
import { AccountEntityService } from './account-entity.service';
import { AccountEntityComponent } from './account-entity.component';
import { AccountEntityDetailComponent } from './account-entity-detail.component';
import { AccountEntityUpdateComponent } from './account-entity-update.component';

@Injectable({ providedIn: 'root' })
export class AccountEntityResolve implements Resolve<IAccountEntity> {
  constructor(private service: AccountEntityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountEntity> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((accountEntity: HttpResponse<AccountEntity>) => {
          if (accountEntity.body) {
            return of(accountEntity.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AccountEntity());
  }
}

export const accountEntityRoute: Routes = [
  {
    path: '',
    component: AccountEntityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AccountEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountEntityDetailComponent,
    resolve: {
      accountEntity: AccountEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AccountEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountEntityUpdateComponent,
    resolve: {
      accountEntity: AccountEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AccountEntities',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountEntityUpdateComponent,
    resolve: {
      accountEntity: AccountEntityResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AccountEntities',
    },
    canActivate: [UserRouteAccessService],
  },
];
