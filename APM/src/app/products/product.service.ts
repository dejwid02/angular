import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
  url = 'api/products/products.json';
    constructor(private http: HttpClient) { }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.url).pipe(tap(v=> 'All:' + ));
    }
}