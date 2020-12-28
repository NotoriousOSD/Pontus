import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Profile } from './profile';
import { LoggerService} from './logger.service';
import {Entry} from "./entry";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private loginUrl = 'http://localhost:4000/api/login'; // URL to login web api
  private registerUrl = 'http://localhost:4000/api/register': // URL to register web api
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

  private log(message: string) {
    this.loggerService.add(`ProfileService: ${message}`);
  }

  submitLogin(profile: Profile): Observable<any> {
    return this.http.post<Profile>(this.loginUrl, profile, this.httpOptions)
      .pipe(
        tap(_ => this.log('submitted login')),
        catchError(this.handleError<any>('submitLogin', null))
      );
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
