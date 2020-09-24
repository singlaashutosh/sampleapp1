import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sampleapp1SharedModule } from 'app/shared/shared.module';
import { TransactionEntityComponent } from './transaction-entity.component';
import { TransactionEntityDetailComponent } from './transaction-entity-detail.component';
import { TransactionEntityUpdateComponent } from './transaction-entity-update.component';
import { TransactionEntityDeleteDialogComponent } from './transaction-entity-delete-dialog.component';
import { transactionEntityRoute } from './transaction-entity.route';

@NgModule({
  imports: [Sampleapp1SharedModule, RouterModule.forChild(transactionEntityRoute)],
  declarations: [
    TransactionEntityComponent,
    TransactionEntityDetailComponent,
    TransactionEntityUpdateComponent,
    TransactionEntityDeleteDialogComponent,
  ],
  entryComponents: [TransactionEntityDeleteDialogComponent],
})
export class Sampleapp1TransactionEntityModule {}
