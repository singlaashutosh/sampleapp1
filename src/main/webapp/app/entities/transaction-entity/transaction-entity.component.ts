import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionEntity } from 'app/shared/model/transaction-entity.model';
import { TransactionEntityService } from './transaction-entity.service';
import { TransactionEntityDeleteDialogComponent } from './transaction-entity-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-entity',
  templateUrl: './transaction-entity.component.html',
})
export class TransactionEntityComponent implements OnInit, OnDestroy {
  transactionEntities?: ITransactionEntity[];
  eventSubscriber?: Subscription;

  constructor(
    protected transactionEntityService: TransactionEntityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.transactionEntityService
      .query()
      .subscribe((res: HttpResponse<ITransactionEntity[]>) => (this.transactionEntities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTransactionEntities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITransactionEntity): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTransactionEntities(): void {
    this.eventSubscriber = this.eventManager.subscribe('transactionEntityListModification', () => this.loadAll());
  }

  delete(transactionEntity: ITransactionEntity): void {
    const modalRef = this.modalService.open(TransactionEntityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionEntity = transactionEntity;
  }
}
