import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SordersService } from '../../core/service/sorders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  private readonly _SordersService = inject(SordersService)
  cartId: string | null = ""
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params)
        this.cartId = params.get('id')
      }
    })
  }


  orderForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    city: new FormControl(null, Validators.required)
  });

  constructor() {

  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Order Data:', orderData);
      // قم بإرسال البيانات إلى الخادم هنا

      if (this.cartId !== null) {
        this._SordersService.chechout(this.cartId, orderData).subscribe({
          // rest of the code remains the same
          next: (res) => {
            if (res.status === "success") {
              window.open(res.session.url,'_blank')
            }
          },
          error: (err) => {
            console.log(err)
          }
        });
      }


    }
  }
}
