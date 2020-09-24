import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TransactionEntityService } from 'app/entities/transaction-entity/transaction-entity.service';
import { ITransactionEntity, TransactionEntity } from 'app/shared/model/transaction-entity.model';
import { TransType } from 'app/shared/model/enumerations/trans-type.model';

describe('Service Tests', () => {
  describe('TransactionEntity Service', () => {
    let injector: TestBed;
    let service: TransactionEntityService;
    let httpMock: HttpTestingController;
    let elemDefault: ITransactionEntity;
    let expectedResult: ITransactionEntity | ITransactionEntity[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TransactionEntityService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TransactionEntity(0, 0, currentDate, TransType.DEBIT, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            transDate: currentDate.format(DATE_FORMAT),
            entryDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TransactionEntity', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            transDate: currentDate.format(DATE_FORMAT),
            entryDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );

        service.create(new TransactionEntity()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TransactionEntity', () => {
        const returnedFromService = Object.assign(
          {
            transAmmount: 1,
            transDate: currentDate.format(DATE_FORMAT),
            transType: 'BBBBBB',
            entryDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TransactionEntity', () => {
        const returnedFromService = Object.assign(
          {
            transAmmount: 1,
            transDate: currentDate.format(DATE_FORMAT),
            transType: 'BBBBBB',
            entryDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transDate: currentDate,
            entryDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TransactionEntity', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
