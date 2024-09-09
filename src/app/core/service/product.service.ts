import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  product } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private readonly _HttpClient=inject(HttpClient)
getAllProduct():Observable<any>{
return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products")
}

getSpecificProduct(data:string|null):Observable<any>{
  return this._HttpClient.get<product[]>(`https://ecommerce.routemisr.com/api/v1/products/${data}`)
  }



  constructor() { }
}
