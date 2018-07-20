import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

export interface Cluster {
  _id: number;
  name: string;
  description: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClusterService {

  private clustersUrl = 'http://localhost:3000/vins';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  /** GET obtenemos todos los clusters */
  getClusters (): Observable<Cluster[]> {
    return this.http.get<Cluster[]>(this.clustersUrl)
      .pipe(
        tap(clusters => this.log(`fetched clusters`)),
        catchError(this.handleError('getClusters', []))
      );
  }

  /** GET obtenemos un cluster por su id. Devolvemos `undefined` cuando no exista */
  getClusterNo404<Data>(_id: number): Observable<Cluster> {
    const url = `${this.clustersUrl}/${_id}`;
    return this.http.get<Cluster[]>(url)
      .pipe(
        map(clusters => clusters[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cluster id=${_id}`);
        }),
        catchError(this.handleError<Cluster>(`getCluster id=${_id}`))
      );
  }

  /** POST: añadimos un nuevo cluster */
  addCluster (cluster: Cluster): Observable<Cluster> {
    return this.http.post<Cluster>(this.clustersUrl, cluster, httpOptions).pipe(
      tap((cluster: Cluster) => this.log(`added cluster w/ id=${cluster._id}`)),
      catchError(this.handleError<Cluster>('addCluster'))
    );
  }

  /** DELETE: eliminamos un cluster */
  deleteCluster (cluster: Cluster | number): Observable<Cluster> {
    const id = typeof cluster === 'number' ? cluster : cluster._id;
    const url = `${this.clustersUrl}/${id}`;

    return this.http.delete<Cluster>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted cluster id=${id}`)),
      catchError(this.handleError<Cluster>('deleteCluster'))
    );
  }

  /** PUT: actualizamos un cluster */
  updateCluster (cluster: Cluster): Observable<any> {
    const url = `${this.clustersUrl}/${cluster._id}`;
    return this.http.put(url, cluster, httpOptions).pipe(
      tap(_ => this.log(`updated cluster id=${cluster._id}`)),
      catchError(this.handleError<any>('updateCluster'))
    );
  }

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