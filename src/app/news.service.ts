import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


export interface News {
  _id: number;
  title: string;
  content: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NewsService {

  private newssUrl = 'http://localhost:3000/news';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  /** GET obtenemos todos los newss */
  getNews (): Observable<News[]> {
    return this.http.get<News[]>(this.newssUrl)
      .pipe(
        tap(newss => this.log(`fetched newss`)),
        catchError(this.handleError('getnewss', []))
      );
  }

  /** GET obtenemos un news por su id. Devolvemos `undefined` cuando no exista */
  getNewsNo404<Data>(_id: number): Observable<News> {
    const url = `${this.newssUrl}/${_id}`;
    return this.http.get<News[]>(url)
      .pipe(
        map(newss => newss[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} news id=${_id}`);
        }),
        catchError(this.handleError<News>(`getnews id=${_id}`))
      );
  }

  /** POST: añadimos un nuevo news */
  addNews (news: News): Observable<News> {
    return this.http.post<News>(this.newssUrl, news, httpOptions).pipe(
      tap((news: News) => this.log(`added news w/ id=${news._id}`)),
      catchError(this.handleError<News>('addnews'))
    );
  }

  /** DELETE: eliminamos un news */
  deleteNews (news: News | number): Observable<News> {
    const id = typeof news === 'number' ? news : news._id;
    const url = `${this.newssUrl}/${id}`;

    return this.http.delete<News>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted news id=${id}`)),
      catchError(this.handleError<News>('deletenews'))
    );
  }

  /** PUT: actualizamos un news */
  updateNews (news: News): Observable<any> {
    const url = `${this.newssUrl}/${news._id}`;
    return this.http.put(url, news, httpOptions).pipe(
      tap(_ => this.log(`updated news id=${news._id}`)),
      catchError(this.handleError<any>('updatenews'))
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