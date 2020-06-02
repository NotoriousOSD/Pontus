import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'; /*of is used to mimic HTTP behavior with MockEntries*/
import { catchError, tap } from 'rxjs/operators';
import { Entry } from './entry';
import { LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private entriesUrl = 'http://localhost:4000/api/entries'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private loggerService: LoggerService,
    private http: HttpClient
  ) { }
  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.entriesUrl)
      .pipe(
        tap(_ => this.log('fetched entries')),
        catchError(this.handleError<Entry[]>('getEntries', []))
      );
  }
  /** GET entry by id. Will 404 if id not found */
  getEntry(id: string): Observable<Entry> {
    const url = `${this.entriesUrl}/${id}`;
    return this.http.get<Entry>(url).pipe(
      tap(_ => this.log(`fetched entry id=${id}`)),
      catchError(this.handleError<Entry>(`getEntry id=${id}`))
    );
  }
  /*PUT: update the entry on the server */
  updateEntry(entry: Entry): Observable<any> {
    const url = `${this.entriesUrl}/${entry._id}`;
    return this.http.put(url, entry, this.httpOptions).pipe(
      tap(_ => this.log(`updated entry id=${entry._id}`)),
      catchError(this.handleError<any>('updateEntry'))
    );
  }
  /*POST: add a new entry to the server */
  addEntry(entry: Entry): Observable<Entry> {
    console.log('Entry added:');
    console.log(entry);
    return this.http.post<Entry>(this.entriesUrl, entry, this.httpOptions).pipe(
      tap((newEntry: Entry) => this.log(`added entry w/ id=${newEntry._id}`)),
      catchError(this.handleError<Entry>('addEntry'))
    );
  }
  /*DELETE: delete the entry from the server */
  deleteEntry(entry: Entry | string): Observable<Entry> {
    const id = typeof entry === 'string' ? entry : entry._id;
    const url = `${this.entriesUrl}/${id}`;
    return this.http.delete<Entry>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted entry id=${id}`)),
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }
  private log(message: string) {
    this.loggerService.add(`EntryService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
