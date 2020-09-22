import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account-entity',
        loadChildren: () => import('./account-entity/account-entity.module').then(m => m.Sampleapp1AccountEntityModule),
      },
      {
        path: 'transaction-entity',
        loadChildren: () => import('./transaction-entity/transaction-entity.module').then(m => m.Sampleapp1TransactionEntityModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Sampleapp1EntityModule {}
