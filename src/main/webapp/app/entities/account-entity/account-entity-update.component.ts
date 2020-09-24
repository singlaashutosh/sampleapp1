import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAccountEntity, AccountEntity } from 'app/shared/model/account-entity.model';
import { AccountEntityService } from './account-entity.service';

@Component({
  selector: 'jhi-account-entity-update',
  templateUrl: './account-entity-update.component.html',
})
export class AccountEntityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [null, []],
    accountEntityName: [null, [Validators.required]],
    description: [null, [Validators.required]],
    openingBalance: [null, [Validators.required]],
    closingBalance: [],
    createdAt: [],
  });

  constructor(protected accountEntityService: AccountEntityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountEntity }) => {
      if (!accountEntity.id) {
        const today = moment().startOf('day');
        accountEntity.createdAt = today;
      }

      this.updateForm(accountEntity);
    });
  }

  updateForm(accountEntity: IAccountEntity): void {
    this.editForm.patchValue({
      id: accountEntity.id,
      code: accountEntity.code,
      accountEntityName: accountEntity.accountEntityName,
      description: accountEntity.description,
      openingBalance: accountEntity.openingBalance,
      closingBalance: accountEntity.closingBalance,
      createdAt: accountEntity.createdAt ? accountEntity.createdAt.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountEntity = this.createFromForm();
    if (accountEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.accountEntityService.update(accountEntity));
    } else {
      this.subscribeToSaveResponse(this.accountEntityService.create(accountEntity));
    }
  }

  private createFromForm(): IAccountEntity {
    return {
      ...new AccountEntity(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      accountEntityName: this.editForm.get(['accountEntityName'])!.value,
      description: this.editForm.get(['description'])!.value,
      openingBalance: this.editForm.get(['openingBalance'])!.value,
      closingBalance: this.editForm.get(['closingBalance'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountEntity>>): void {
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
}
