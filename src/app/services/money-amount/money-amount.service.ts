import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', "bearer " + localStorage.getItem('token'))
};

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MoneyAmountService {

  constructor(private http: HttpClient) { }

  getMoneyAmount(): Observable<any> {
    const url = `${apiUrl}/get-moneyAmount`;
    return this.http.get(url, httpOptions).pipe(
      map((response:any)=> {
        const moneyAmount = response.Result;
        if (moneyAmount.Success) {
          console.log("check this shit out " + JSON.stringify(moneyAmount.MoneyAmountViewModel));
          localStorage.setItem('moneyAmount', JSON.stringify(moneyAmount.MoneyAmountViewModel));
        }
      }))
  }

  updateMoneyAmount(data: any): Observable<any> {
    const url = `${apiUrl}/update-moneyAmount`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        map((response:any)=>{
          const moneyAmount = response;
          if (moneyAmount.Payload.Success) {
            console.log(JSON.stringify(moneyAmount.Payload.MoneyAmountViewModel));
            localStorage.setItem('moneyAmount', JSON.stringify(moneyAmount.Payload.MoneyAmountViewModel));
          }
        }))
  }

  ReBalanceMoneyAmount(data: any): Observable<any> {
    const url = `${apiUrl}/reBalance-moneyAmount`;
    console.log(data);
    return this.http.post(url, data, httpOptions)
      .pipe(
        map((response:any)=>{
          const moneyAmount = response;
            localStorage.setItem('TakeOutString', JSON.stringify(moneyAmount.TakeOutString));
        }))
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
