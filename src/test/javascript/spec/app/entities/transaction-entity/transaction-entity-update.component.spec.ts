import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Sampleapp1TestModule } from '../../../test.module';
import { TransactionEntityUpdateComponent } from 'app/entities/transaction-entity/transaction-entity-update.component';
import { TransactionEntityService } from 'app/entities/transaction-entity/transaction-entity.service';
import { TransactionEntity } from 'app/shared/model/transaction-entity.model';

describe('Component Tests', () => {
  describe('TransactionEntity Management Update Component', () => {
    let comp: TransactionEntityUpdateComponent;
    let fixture: ComponentFixture<TransactionEntityUpdateComponent>;
    let service: TransactionEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sampleapp1TestModule],
        declarations: [TransactionEntityUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TransactionEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionEntity(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TransactionEntity();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
