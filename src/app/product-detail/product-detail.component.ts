import { OnInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Comment } from '../share/product.service';
import { WebSocketService } from '../share/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    product: Product;
    comments: Comment[];

    newRating: number = 5;
    newComment: string = "";

    isCommentHidden: boolean = true;

    isWatched: boolean = false; //当前是否关注
    currentBid: number;

    subscription:Subscription;

    constructor(private routerInfo: ActivatedRoute,
        private wsService: WebSocketService,
        private productService: ProductService) { }

    ngOnInit() {
        let productId: number = this.routerInfo.snapshot.params["productId"];

        this.productService.getProduct(productId).subscribe(
            product => {
                this.product = product;
                this.currentBid = this.product.price;
            }
        );
        this.productService.getCommentsForProductId(productId).subscribe(
            comments => this.comments = comments
        );
    }

    addComment() {
        let comment = new Comment(0, this.product.id, new Date().toISOString(), "someone", this.newRating, this.newComment);
        this.comments.unshift(comment);

        let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
        this.product.rating = sum / this.comments.length;

        this.newComment = "";
        this.newRating = 5;
        this.isCommentHidden = true;
    }

    watchProduct() {
        if(this.subscription){
            this.subscription.unsubscribe(); //取消订阅时会调用close方法
            this.isWatched =false;
            this.subscription = null;
        }else{
            this.isWatched=true;
            this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id)
            .subscribe(
                products => {
                    let product = products.find((p) => p.productId === this.product.id);
                    this.currentBid = product.bid
                }
            )
        }
    }

}
