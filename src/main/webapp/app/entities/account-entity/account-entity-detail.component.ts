import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAccountEntity } from 'app/shared/model/account-entity.model';

@Component({
  selector: 'jhi-account-entity-detail',
  templateUrl: './account-entity-detail.component.html',
})
export class AccountEntityDetailComponent implements OnInit {
  accountEntity: IAccountEntity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountEntity }) => (this.accountEntity = accountEntity));
  }

  previousState(): void {
    window.history.back();
  }
}
