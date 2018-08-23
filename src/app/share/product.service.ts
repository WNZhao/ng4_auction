import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import "rxjs/Rx";
import { filter } from 'rxjs/operators';


@Injectable()
export class ProductService {

    searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

    constructor(private http: Http) { }

    /* products: Product[] = [
        new Product(1, "第一个商品", 1.99, 3.5, "学习ng4实战", ["电子产品", "硬件设备"]),
        new Product(2, "第二个商品", 3.99, 4.5, "学习ng4实战", ["硬件设备"]),
        new Product(3, "第三个商品", 4.99, 2.5, "学习ng4实战", ["硬件设备"]),
        new Product(4, "第四个商品", 5.99, 5, "学习ng4实战", ["电子产品"]),
        new Product(5, "第五个商品", 16.99, 1, "学习ng4实战", ["文具"]),
        new Product(6, "第六个商品", 16.99, 1, "学习ng4实战", ["办公用品"]),
    ]; */

    /* private comments: Comment[] = [
        new Comment(1, 1, "2017-02-02 23:00:00", "张三", 3, "东西不错"),
        new Comment(2, 1, "2017-03-02 24:00:00", "李四", 4, "东西不错111"),
        new Comment(3, 1, "2017-04-02 20:00:00", "王五", 2, "东西不错22"),
        new Comment(4, 2, "2017-05-02 22:00:00", "张三", 4, "东西不错333"),
    ]; */

    getAllCategories(): string[] {
        return ["电子产品", "硬件设备", "图书"]
    }

    //获取所有商品
    getProducts(): Observable<Product[]> {
        // return this.products;
        return this.http.get("/api/products").map(res => res.json())
    }
    //根据id返回相关信息
    getProduct(id: number): Observable<Product> {
        //return this.products.find((product) => product.id == id)
        return this.http.get("/api/product/" + id).map(res => res.json())
    }
    //获取商品的评论信息
    getCommentsForProductId(id: number): Observable<Comment[]> {
        //return this.comments.filter((comment: Comment) => comment.productId == id)
        return this.http.get(`/api/product/${id}/comments`).map(res => res.json())
    }

    search(params: ProductSearchParams): Observable<Product[]> {
        
        return this.http.get("/api/products", { search: this.encodeParams(params) }).map(res => res.json())
    }
    private encodeParams(params: ProductSearchParams): Object {
        return Object.keys(params)
            .filter(key=>params[key])
            .reduce((sum: URLSearchParams, key: string) => {
                console.log(key, params[key]);
                sum[key]=params[key];
                return sum;
            }, {});
    }



}

export class ProductSearchParams {
    constructor(
        public title: string,
        public price: number,
        public category: string
    ) { }
}

export class Comment {
    constructor(
        public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string
    ) {

    }
}


/* 
  定义实体类 产品信息
*/
export class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>
    ) {

    }
}
