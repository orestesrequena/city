import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



export interface Vignoble {
  _id: number;
  name:        String;
  image:       String;
  email:       String;
  phone:       Number;
  address:     String;
  description: String;
  latitude:    Number;
  longitude:   Number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VignobleService {

  private vignoblesUrl = 'http://localhost:3000/vignoble';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  /** GET obtenemos todos los vignobles */
  getVignobles (): Observable<Vignoble []> {
    return this.http.get<Vignoble []>(this.vignoblesUrl)
      .pipe(
        tap(vignobles => this.log(`fetched vignobles`)),
        catchError(this.handleError('getvignobles', []))
      );
  }

  /** GET obtenemos un vignoble por su id. Devolvemos `undefined` cuando no exista */
  getVignobleNo404<Data>(_id: number): Observable<Vignoble> {
    const url = `${this.vignoblesUrl}/${_id}`;
    return this.http.get<Vignoble []>(url)
      .pipe(
        map(vignobles => vignobles[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} vignoble id=${_id}`);
        }),
        catchError(this.handleError<Vignoble >(`getvignoble id=${_id}`))
      );
  }

  // /** POST: añadimos un nuevo vignoble */
  // addVignoble (vignoble: Vignoble): Observable<Vignoble> {
  //   return this.http.post<Vignoble>(this.vignoblesUrl, vignoble, httpOptions).pipe(
  //     tap((vignoble: Vignoble) => this.log(`added vignoble w/ id=${vignoble._id}`)),
  //     catchError(this.handleError<Vignoble>('addVignoble'))
  //   );
  // // }

  // /** DELETE: eliminamos un vignoble */
  // deleteVignoble (vignoble: Vignoble | number): Observable<Vignoble> {
  //   const id = typeof vignoble === 'number' ? vignoble : vignoble._id;
  //   const url = `${this.vignoblesUrl}/${id}`;

  //   return this.http.delete<Vignoble>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted vignoble id=${id}`)),
  //     catchError(this.handleError<Vignoble>('deletevignoble'))
  //   );
  // }

  // /** PUT: actualizamos un vignoble */
  // updateVignoble (vignoble: Vignoble): Observable<any> {
  //   const url = `${this.vignoblesUrl}/${vignoble._id}`;
  //   return this.http.put(url, vignoble, httpOptions).pipe(
  //     tap(_ => this.log(`updated vignoble id=${vignoble._id}`)),
  //     catchError(this.handleError<any>('updatevignoble'))
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