import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { AccountEntityService } from './account-entity.service';
import { AccountEntityDeleteDialogComponent } from './account-entity-delete-dialog.component';

@Component({
  selector: 'jhi-account-entity',
  templateUrl: './account-entity.component.html',
})
export class AccountEntityComponent implements OnInit, OnDestroy {
  accountEntities?: IAccountEntity[];
  eventSubscriber?: Subscription;

  constructor(
    protected accountEntityService: AccountEntityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.accountEntityService.query().subscribe((res: HttpResponse<IAccountEntity[]>) => (this.accountEntities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAccountEntities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAccountEntity): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAccountEntities(): void {
    this.eventSubscriber = this.eventManager.subscribe('accountEntityListModification', () => this.loadAll());
  }

  delete(accountEntity: IAccountEntity): void {
    const modalRef = this.modalService.open(AccountEntityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.accountEntity = accountEntity;
  }
}
