import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

import * as fromApp from '../../store/app.reducer';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item: Item | undefined;
  loading = true;
  selectedSize = "";
  itemAddedToCart = false;

  constructor(private itemsService: ItemsService, private cartService: CartService, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.route.params.subscribe((value) => {
      this.itemsService.getItem(value.id).subscribe((item) => {
        this.item = item;
        this.loading = false;
      });
    })
  }

  changeSize(size: string) {
    this.selectedSize = size;
  }

  onAddToCart() {
    this.cartService.addItemToCart(this.item!, this.selectedSize);
    this.itemAddedToCart = true;
  }

}
