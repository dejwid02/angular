import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
  url = 'api/products/products.json';
    constructor(private http: HttpClient) { }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.url).pipe(tap(v => 'All:' + JSON.stringify(v)),
        catchError(this.handleError));
    }

    handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return throwError(err.message);
    }
}