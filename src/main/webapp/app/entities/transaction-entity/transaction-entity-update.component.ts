import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransactionEntity, TransactionEntity } from 'app/shared/model/transaction-entity.model';
import { TransactionEntityService } from './transaction-entity.service';
import { IAccountEntity } from 'app/shared/model/account-entity.model';
import { AccountEntityService } from 'app/entities/account-entity/account-entity.service';

@Component({
  selector: 'jhi-transaction-entity-update',
  templateUrl: './transaction-entity-update.component.html',
})
export class TransactionEntityUpdateComponent implements OnInit {
  isSaving = false;
  accountentities: IAccountEntity[] = [];
  transDateDp: any;

  editForm = this.fb.group({
    id: [],
    transAmmount: [null, [Validators.required]],
    transDate: [null, [Validators.required]],
    transType: [null, [Validators.required]],
    entryDate: [],
    accountEntity: [],
  });

  constructor(
    protected transactionEntityService: TransactionEntityService,
    protected accountEntityService: AccountEntityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionEntity }) => {
      if (!transactionEntity.id) {
        const today = moment().startOf('day');
        transactionEntity.entryDate = today;
      }

      this.updateForm(transactionEntity);

      this.accountEntityService.query().subscribe((res: HttpResponse<IAccountEntity[]>) => (this.accountentities = res.body || []));
    });
  }

  updateForm(transactionEntity: ITransactionEntity): void {
    this.editForm.patchValue({
      id: transactionEntity.id,
      transAmmount: transactionEntity.transAmmount,
      transDate: transactionEntity.transDate,
      transType: transactionEntity.transType,
      entryDate: transactionEntity.entryDate ? transactionEntity.entryDate.format(DATE_TIME_FORMAT) : null,
      accountEntity: transactionEntity.accountEntity,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactionEntity = this.createFromForm();
    if (transactionEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionEntityService.update(transactionEntity));
    } else {
      this.subscribeToSaveResponse(this.transactionEntityService.create(transactionEntity));
    }
  }

  private createFromForm(): ITransactionEntity {
    return {
      ...new TransactionEntity(),
      id: this.editForm.get(['id'])!.value,
      transAmmount: this.editForm.get(['transAmmount'])!.value,
      transDate: this.editForm.get(['transDate'])!.value,
      transType: this.editForm.get(['transType'])!.value,
      entryDate: this.editForm.get(['entryDate'])!.value ? moment(this.editForm.get(['entryDate'])!.value, DATE_TIME_FORMAT) : undefined,
      accountEntity: this.editForm.get(['accountEntity'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionEntity>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAccountEntity): any {
    return item.id;
  }
}
