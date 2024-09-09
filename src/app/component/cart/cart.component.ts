
import { Component, inject, OnInit } from '@angular/core';
import { ScardService } from '../../core/service/scard.service';
import { Icart } from '../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly _ScardService = inject(ScardService)
  cartDetails: Icart = {} as Icart
  ngOnInit(): void {
    this._ScardService.getAllCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data
      },
      error: (err) => { console.log(err) }
    })
  }
  trackByProductId(index: number, item: any): number {
    return item.product.id;
  }

  increaseCount(item: any): void {
    item.count++;
    this.updateTotalCartPrice();
  }

  decreaseCount(item: any): void {
    if (item.count > 1) {
      item.count--;
      this.updateTotalCartPrice();
    }
  }

  removeItem(item: any): void {
    const index = this.cartDetails.products.indexOf(item);
    if (index > -1) {
      this.cartDetails.products.splice(index, 1);
      this.updateTotalCartPrice();
    }
  }

  updateTotalCartPrice(): void {
    this.cartDetails.totalCartPrice = this.cartDetails.products.reduce((total, item) => total + (item.price * item.count), 0);
  }

  clearCart(): void {
    this._ScardService.clearCart().subscribe({
      next: (res) => {
        this.cartDetails.products = [];
        this.cartDetails.totalCartPrice = 0;
      },
      error: (err) => { console.log(err) }
    })
  }

}
