import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = null;
  constructor() { }
  sendData(data: object): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
  }

  sendLogin(data: object): Observable<any> {
    return this._httpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
  }
  saveUserData() {
    if (localStorage.getItem("userToken") !== null) {
      this.userData = jwtDecode(localStorage.getItem("userToken")!)
    }
  }
  
  logOut(): void {
    localStorage.removeItem("userToken")
    this.userData = null
    this._Router.navigate(["login"])
  }

  //******************************forget password*********************************************//
  submitEmail(data:object):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,data)
  }
  submitCode(data:object):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,data)
  }
  resetPass(data:object):Observable<any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)
  }
}
