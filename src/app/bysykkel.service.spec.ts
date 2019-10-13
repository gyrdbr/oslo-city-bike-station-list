import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BysykkelService } from './bysykkel.service';

describe('BysykkelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [BysykkelService]
  }));

  it('should be created', () => {
    const service: BysykkelService = TestBed.get(BysykkelService);
    expect(service).toBeTruthy();
  });

  it(
    'should get stations',
    inject(
      [HttpTestingController, BysykkelService],
      (httpMock: HttpTestingController, bysykkelService: BysykkelService) => {
        const mockStations = {
          last_updated: 1553592653,
          data: {
            stations: [
              {
                station_id: '627',
                name: 'Skøyen Stasjon',
                address: 'Skøyen Stasjon',
                lat: 59.9226729,
                lon: 10.6788129,
                capacity: 20
              },
              {
                station_id: '623',
                name: '7 Juni Plassen',
                address: '7 Juni Plassen',
                lat: 59.9150596,
                lon: 10.7312715,
                capacity: 15
              }
            ]
          }
        };
        bysykkelService.getBikeSites().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockStations);
          }
        });

        const mockReq = httpMock.expectOne(bysykkelService.corsApiUrl + bysykkelService.stationInfoUrl);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockStations);

        httpMock.verify();
      }
    )
  );

  it(
    'should get station info',
    inject(
      [HttpTestingController, BysykkelService],
      (httpMock: HttpTestingController, bysykkelService: BysykkelService) => {
        const mockStationInfo = {
          last_updated: 1540219230,
          data: {
            stations: [
              {
                is_installed: 1,
                is_renting: 1,
                num_bikes_available: 7,
                num_docks_available: 5,
                last_reported: 1540219230,
                is_returning: 1,
                station_id: '175'
              },
              {
                is_installed: 1,
                is_renting: 1,
                num_bikes_available: 4,
                num_docks_available: 8,
                last_reported: 1540219230,
                is_returning: 1,
                station_id: '47'
              }
            ]
          }
        };

        bysykkelService.getBikeSiteStatus().subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(mockStationInfo);
          }
        });

        const mockReq = httpMock.expectOne(bysykkelService.corsApiUrl + bysykkelService.stationStatusUrl);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockStationInfo);

        httpMock.verify();
      }
    )
  );
});
