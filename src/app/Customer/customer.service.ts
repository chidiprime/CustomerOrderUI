import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './Customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiURL = "localhost:61566";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.apiURL + '/api/customer/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiURL + '/Customer/', JSON.stringify(Customer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  find(id): Observable<Customer> {
    return this.httpClient.get<Customer>(this.apiURL + '/Customers/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.apiURL + '/Customers/' + id, JSON.stringify(Customer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Customer>(this.apiURL + '/Customers/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

