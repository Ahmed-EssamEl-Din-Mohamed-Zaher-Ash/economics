import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScategoryService {
  private readonly _HttpClient=inject(HttpClient)

  constructor() { }
  getAllCategory():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  get_spic_Category(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
}
