import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Sampleapp1TestModule } from '../../../test.module';
import { TransactionEntityDetailComponent } from 'app/entities/transaction-entity/transaction-entity-detail.component';
import { TransactionEntity } from 'app/shared/model/transaction-entity.model';

describe('Component Tests', () => {
  describe('TransactionEntity Management Detail Component', () => {
    let comp: TransactionEntityDetailComponent;
    let fixture: ComponentFixture<TransactionEntityDetailComponent>;
    const route = ({ data: of({ transactionEntity: new TransactionEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sampleapp1TestModule],
        declarations: [TransactionEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TransactionEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load transactionEntity on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transactionEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
