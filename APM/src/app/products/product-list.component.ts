import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    _listFilter: string;
    products: IProduct[];
    filteredProducts: IProduct[];

    constructor(private productService: ProductService) {

    }

    ngOnInit(): void {
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
      this.listFilter = 'cart';
    }
    public get listFilter(): string {
      return this._listFilter;
    }

    public set listFilter(v: string) {
      this._listFilter = v;
      this.filteredProducts = this.listFilter ? this.performFiltering(this.listFilter) : this.products;
    }


      toggleImage(): void {
        this.showImage = !this.showImage;
      }

      performFiltering(filter: string): IProduct[] {
        filter = filter.toLowerCase();
        return this.products.filter((product: IProduct) => product.productName.toLowerCase().indexOf(filter) !== -1);
      }
}
