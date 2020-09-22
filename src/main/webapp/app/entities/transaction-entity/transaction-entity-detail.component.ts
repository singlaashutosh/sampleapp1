import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';

@Component({
  selector: 'jhi-transaction-entity-detail',
  templateUrl: './transaction-entity-detail.component.html',
})
export class TransactionEntityDetailComponent implements OnInit {
  transactionEntity: ITransactionEntity | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionEntity }) => (this.transactionEntity = transactionEntity));
  }

  previousState(): void {
    window.history.back();
  }
}
