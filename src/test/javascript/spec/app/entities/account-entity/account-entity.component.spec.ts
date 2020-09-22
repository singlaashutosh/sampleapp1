import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sampleapp1TestModule } from '../../../test.module';
import { AccountEntityComponent } from 'app/entities/account-entity/account-entity.component';
import { AccountEntityService } from 'app/entities/account-entity/account-entity.service';
import { AccountEntity } from 'app/shared/model/account-entity.model';

describe('Component Tests', () => {
  describe('AccountEntity Management Component', () => {
    let comp: AccountEntityComponent;
    let fixture: ComponentFixture<AccountEntityComponent>;
    let service: AccountEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sampleapp1TestModule],
        declarations: [AccountEntityComponent],
      })
        .overrideTemplate(AccountEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AccountEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AccountEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AccountEntity(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.accountEntities && comp.accountEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
