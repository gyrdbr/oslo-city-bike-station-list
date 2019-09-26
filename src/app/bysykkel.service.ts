import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BysykkelService {

  private corsApiUrl = 'https://cors-anywhere.herokuapp.com/'; // proxy to enable cross-origin requests
  private stationInfoUrl =
    'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'; // station information endpoint
  private stationStatusUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'; // stations status endpoint

  private stationOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Client-Identifier': 'gyrd-bysykkeldemo'
    })
  };

  constructor(
    private http: HttpClient
  ) {}

  /** GET station information endpoint */
  getBikeSites(): Observable<any> {
    return this.http.get(this.corsApiUrl + this.stationInfoUrl, this.stationOptions)
      .pipe(
        catchError(this.handleError<any>('getBikeSites', []))
      );
  }

  /** GET station with availability status endpoint */
  getBikeSiteStatus(): Observable<any> {
    return this.http.get(this.corsApiUrl + this.stationStatusUrl, this.stationOptions)
      .pipe(
        catchError(this.handleError<any>('getBikeStatus', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
