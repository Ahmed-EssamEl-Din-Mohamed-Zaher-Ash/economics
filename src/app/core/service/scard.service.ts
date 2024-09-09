import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScardService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }
  private ApiUrl: string = "https://ecommerce.routemisr.com/api/v1/cart"
  userToken: any = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDFmNzU2NTI4ZGZlZTA0MDc2ZTZmYSIsIm5hbWUiOiLYo9it2YXYryDYudi12KfZhSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI1ODA4NDQzLCJleHAiOjE3MzM1ODQ0NDN9.Mj_quhxVf1E3zySgKX_eLQcC52n_E0KUahaxAnewS30' }

  addToCard(id: string): Observable<any> {
    return this._HttpClient.post(this.ApiUrl,
      { "productId": id },
      {
        headers: this.userToken
      }
    )

  }

  
  getAllCart(): Observable<any> {
    return this._HttpClient.get(this.ApiUrl,
      {
        headers: this.userToken
      }
    )

  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(this.ApiUrl, { headers: this.userToken });
  }}

