import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sampleapp1SharedModule } from 'app/shared/shared.module';
import { AccountEntityComponent } from './account-entity.component';
import { AccountEntityDetailComponent } from './account-entity-detail.component';
import { AccountEntityUpdateComponent } from './account-entity-update.component';
import { AccountEntityDeleteDialogComponent } from './account-entity-delete-dialog.component';
import { accountEntityRoute } from './account-entity.route';

@NgModule({
  imports: [Sampleapp1SharedModule, RouterModule.forChild(accountEntityRoute)],
  declarations: [AccountEntityComponent, AccountEntityDetailComponent, AccountEntityUpdateComponent, AccountEntityDeleteDialogComponent],
  entryComponents: [AccountEntityDeleteDialogComponent],
})
export class Sampleapp1AccountEntityModule {}
