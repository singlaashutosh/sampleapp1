import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sampleapp1TestModule } from '../../../test.module';
import { TransactionEntityComponent } from 'app/entities/transaction-entity/transaction-entity.component';
import { TransactionEntityService } from 'app/entities/transaction-entity/transaction-entity.service';
import { TransactionEntity } from 'app/shared/model/transaction-entity.model';

describe('Component Tests', () => {
  describe('TransactionEntity Management Component', () => {
    let comp: TransactionEntityComponent;
    let fixture: ComponentFixture<TransactionEntityComponent>;
    let service: TransactionEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sampleapp1TestModule],
        declarations: [TransactionEntityComponent],
      })
        .overrideTemplate(TransactionEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TransactionEntity(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transactionEntities && comp.transactionEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
