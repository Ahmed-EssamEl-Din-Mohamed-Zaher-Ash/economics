import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/service/auth-service.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _Router = inject(Router)
  msError:string=""
  isLoading:boolean=false;
  msSuccess:boolean=false;
  constructor() { }
  register() {
    if (this.registerForm.valid) {
      this.isLoading=true;
      this._AuthServiceService.sendData(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading=false;
          if(res.message=='success'){
            this.msSuccess=true
          setTimeout(
            ()=>{
              this._Router.navigate(["/login"])
            },1000
          )
          }
          },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
          this.msError=err.error.message}
      })

    }
  }

  confirmPass(g: AbstractControl) {
    if (g.get("password")?.value == g.get("rePassword")?.value) {
      return null
    }
    return { misMatch: true }
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, [Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPass)
}
