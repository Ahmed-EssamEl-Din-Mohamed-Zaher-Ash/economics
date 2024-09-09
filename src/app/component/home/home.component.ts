
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { product } from '../../core/interface/iproduct';
import { Subscription } from 'rxjs';
import { ScategoryService } from '../../core/service/scategory.service';
import { Icategory } from '../../core/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipe/search.pipe';
import { ScardService } from '../../core/service/scard.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CarouselModule,RouterLink,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  text:string=""
  ProductList: product[] = [];
  categoryList: Icategory[] = [];
  getAllproductUnsubscribe!: Subscription;
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  private readonly _ScardService = inject(ScardService)

  private readonly _ProductService = inject(ProductService)
  private readonly _ScategoryService = inject(ScategoryService)
  ngOnInit(): void {
    this._ScategoryService.getAllCategory().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoryList=res.data
      }
    })
    this.getAllproductUnsubscribe = this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.ProductList = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.getAllproductUnsubscribe.unsubscribe()
  }
  addToCard(id:string){
    this._ScardService.addToCard(id).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>{console.log(err)}
    })
  }

}
