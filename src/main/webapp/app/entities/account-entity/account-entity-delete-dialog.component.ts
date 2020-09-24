import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { AccountEntityService } from './account-entity.service';

@Component({
  templateUrl: './account-entity-delete-dialog.component.html',
})
export class AccountEntityDeleteDialogComponent {
  accountEntity?: IAccountEntity;

  constructor(
    protected accountEntityService: AccountEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountEntityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('accountEntityListModification');
      this.activeModal.close();
    });
  }
}
