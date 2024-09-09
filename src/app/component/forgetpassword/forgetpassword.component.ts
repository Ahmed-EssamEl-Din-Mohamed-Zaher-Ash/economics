import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  private readonly _AuthServiceService=inject(AuthServiceService)
  private readonly _Router=inject(Router)
  step:number=1
virfyEmail:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})

virfyCode:FormGroup=new FormGroup({
  code:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
})

resetPassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword: new FormControl(null, [Validators.pattern(/^\w{6,}$/)])
})

verifyEmail(){
  this._AuthServiceService.submitEmail(this.virfyEmail.value).subscribe({
    next:(res)=>{
      if(res.statusMsg=="success"){
        this.step=2
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
verifyCode(){
  this._AuthServiceService.submitEmail(this.virfyCode.value).subscribe({
    next:(res)=>{
      if(res.statusMsg=="Success"){
        this.step=2
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
resetPass(){
  this._AuthServiceService.submitEmail(this.resetPassword.value).subscribe({
    next:(res)=>{
      if(res.statusMsg=="success"){
        this.step=3
        this._Router.navigate(["/home"])
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
