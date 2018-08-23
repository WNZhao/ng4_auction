import { Component, OnInit } from '@angular/core';
import { FormControl } from '../../../node_modules/@angular/forms';
import 'rxjs/Rx';
import { ProductService, Product } from '../share/product.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //声明数组存储product数组
//   private products:Array<Product>;
  private products:Observable<Product[]>; //可观测的流
  private imgUrl = "http://placehold.it/320X150";
//   private keyWords:string;
//   private titleFilter:FormControl = new FormControl();

  constructor(private productService:ProductService) {
    //   this.titleFilter.valueChanges
    //   .debounceTime(500)
    //   .subscribe(value=>this.keyWords=value)
   }
  //组件初始化时调用一次
  ngOnInit() {
    //   this.products = this.productService.getProducts();
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
        params=>this.products = this.productService.search(params)
    )
  }

}

