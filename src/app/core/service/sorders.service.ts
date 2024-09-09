import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SordersService {

  constructor(private readonly _HttpClient:HttpClient) { }
  userToken: any = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDFmNzU2NTI4ZGZlZTA0MDc2ZTZmYSIsIm5hbWUiOiLYo9it2YXYryDYudi12KfZhSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI1ODA4NDQzLCJleHAiOjE3MzM1ODQ0NDN9.Mj_quhxVf1E3zySgKX_eLQcC52n_E0KUahaxAnewS30' }
  chechout(idCart:string,data:object):Observable<any>{   
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200`,
      {
        "shippingAddress":data
    },
    {
      headers:this.userToken
    }
    )
  }
}
