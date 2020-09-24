import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountEntityService } from './account-entity.service';

import { IAccountEntity } from 'app/shared/model/account-entity.model';

@Component({
  selector: 'jhi-account-entity-detail',
  templateUrl: './account-entity-detail.component.html',
})
export class AccountEntityDetailComponent implements OnInit {
  accountEntity: IAccountEntity | null = null;

  transactionEntities: any = [];

  constructor(protected activatedRoute: ActivatedRoute, private service: AccountEntityService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountEntity }) => {
      this.accountEntity = accountEntity;
      this.service.getTransactions(accountEntity.code).subscribe(response => {
        this.transactionEntities = response;
      });
    });
  }

  previousState(): void {
    window.history.back();
  }
}
