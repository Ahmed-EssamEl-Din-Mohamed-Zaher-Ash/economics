import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../core/service/auth-service.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _Router =inject(Router)
  msError: string = ""
  isLoading: boolean = false;
  msSuccess: boolean = false;
  constructor() { }
  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthServiceService.sendLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message == 'success') {
            this.msSuccess = true

            setTimeout(
              () => {
                localStorage.setItem("userToken", res.token)
                this._AuthServiceService.saveUserData()
                this._Router.navigate(["/home"])
              }, 1000
            )
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msError = err.error.message
        }
      })

    }
  }



  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email]),
    password: new FormControl(null, [Validators.pattern(/^\w{6,}$/)]),
  })
}
