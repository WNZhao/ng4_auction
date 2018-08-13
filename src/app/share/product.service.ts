import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

    constructor() { }

    products: Product[] = [
        new Product(1, "第一个商品", 1.99, 3.5, "学习ng4实战", ["电子产品", "硬件设备"]),
        new Product(2, "第二个商品", 3.99, 4.5, "学习ng4实战", ["硬件设备"]),
        new Product(3, "第三个商品", 4.99, 2.5, "学习ng4实战", ["硬件设备"]),
        new Product(4, "第四个商品", 5.99, 5, "学习ng4实战", ["电子产品"]),
        new Product(5, "第五个商品", 16.99, 1, "学习ng4实战", ["文具"]),
        new Product(6, "第六个商品", 16.99, 1, "学习ng4实战", ["办公用品"]),
    ];

    private comments: Comment[] = [
        new Comment(1, 1, "2017-02-02 23:00:00", "张三", 3, "东西不错"),
        new Comment(2, 1, "2017-03-02 24:00:00", "李四", 4, "东西不错111"),
        new Comment(3, 1, "2017-04-02 20:00:00", "王五", 2, "东西不错22"),
        new Comment(4, 2, "2017-05-02 22:00:00", "张三", 4, "东西不错333"),
    ];

    //获取所有商品
    getProducts() {
        return this.products;
    }
    //根据id返回相关信息
    getProduct(id: number): Product {
        return this.products.find((product) => product.id == id)
    }
    //获取商品的评论信息
    getCommentsForProductId(id:number):Comment[]{
        return this.comments.filter((comment:Comment)=>comment.productId==id)
    }

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
