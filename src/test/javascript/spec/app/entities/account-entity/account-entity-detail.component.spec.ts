import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Sampleapp1TestModule } from '../../../test.module';
import { AccountEntityDetailComponent } from 'app/entities/account-entity/account-entity-detail.component';
import { AccountEntity } from 'app/shared/model/account-entity.model';

describe('Component Tests', () => {
  describe('AccountEntity Management Detail Component', () => {
    let comp: AccountEntityDetailComponent;
    let fixture: ComponentFixture<AccountEntityDetailComponent>;
    const route = ({ data: of({ accountEntity: new AccountEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sampleapp1TestModule],
        declarations: [AccountEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AccountEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AccountEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load accountEntity on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.accountEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
