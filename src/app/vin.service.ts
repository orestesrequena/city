import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



export interface Vin{
  _id: number;
  name:        String;
  vineyard: Number;
  image: String;
  quantity: Number;
  price: Number;
  description: String;

}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VinService {

  private vinsUrl = 'http://localhost:3000/vins';  // URL to web api
  private vignobleUrl = 'http://localhost:3000/vignoble'; 
  constructor(
    private http: HttpClient
  ) { }

  /** GET obtenemos todos los vins */
  getVins (): Observable<Vin[]> {
    return this.http.get<Vin[]>(this.vinsUrl)
      .pipe(
        tap(vins => this.log(`fetched vins`)),
        catchError(this.handleError('getvins', []))
      );
  }

  /** GET obtenemos un vin por su id. Devolvemos `undefined` cuando no exista */
  getVinNo404(vin: Vin | string): Observable<Vin> {
    const id = typeof vin === 'string' ? vin : vin._id;
     const url = `${this.vinsUrl}/${id}`;
    return this.http.get<Vin>(url);
  }

    /** GET obtenemos un vin por su id. Devolvemos `undefined` cuando no exista */
    getVignoble(vin: Vin | string): Observable<Vin> {
      const id = typeof vin === 'string' ? vin : vin._id;
       const url = `${this.vignobleUrl}/${id}`;
      return this.http.get<Vin>(url);
    }


  // /** POST: añadimos un nuevo vin */
  // addvin (vin: Vin): Observable<Vin> {
  //   return this.http.post<Vin>(this.vinsUrl, vin, httpOptions).pipe(
  //     tap((vin: Vin) => this.log(`added vin w/ id=${vin._id}`)),
  //     catchError(this.handleError<Vin>('addvin'))
  //   );
  // // }

  // /** DELETE: eliminamos un vin */
  // deleteVin (vin: Vin | number): Observable<Vin> {
  //   const id = typeof vin === 'number' ? vin : vin._id;
  //   const url = `${this.vinsUrl}/${id}`;

  //   return this.http.delete<Vin>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted vin id=${id}`)),
  //     catchError(this.handleError<Vin>('deletevin'))
  //   );
  // }

  // /** PUT: actualizamos un vin */
  // updatevin (vin: Vin): Observable<any> {
  //   const url = `${this.vinsUrl}/${vin._id}`;
  //   return this.http.put(url, vin, httpOptions).pipe(
  //     tap(_ => this.log(`updated vin id=${vin._id}`)),
  //     catchError(this.handleError<any>('updatevin'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {

  }
}