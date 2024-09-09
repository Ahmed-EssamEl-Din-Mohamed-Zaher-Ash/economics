import { product } from './../../core/interface/iproduct';
import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly _ProductService=inject(ProductService)
productID!:string|null;
detailProduct:product|null=null;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
    this.productID=  p.get("id")
    this._ProductService.getSpecificProduct(this.productID).subscribe({
      next:(res)=>{
        this.detailProduct=res.data
        console.log(res.data)
      },error:(err)=>{
        console.log(err)
      }
    })
    }
  })
}
}
