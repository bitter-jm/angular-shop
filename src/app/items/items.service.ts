import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './item.model';
import * as fromApp from '../store/app.reducer';
import * as CartActions from '../cart/store/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private cacheItems: Item[] = [];
  private filter: string = "popular";
  private filterObs: Observable<string> | undefined;
  private emitChangefilter = (filter:string) => {};

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
    this.filterObs =  new Observable<string>( (subscriber: Subscriber<string>) => {
      this.emitChangefilter = (filter:string) => {
        this.filter = filter;
        subscriber.next(filter);
      };
    });
  }

  getActiveFilter() {
    return this.filter;
  }

  changeFilter(filter: string = "popular") {
    console.log(this.store.select("cart"));
    this.emitChangefilter(filter);
  }

  getItems(): Observable<Item[]> {
    return new Observable<Item[]>( (subscriber: Subscriber<Item[]>) => {

      if (this.cacheItems.length === 0) {
        this.http.get("https://angular-shop-3ec7e-default-rtdb.europe-west1.firebasedatabase.app/items.json").subscribe((data) => {
          this.cacheItems = Object.entries(data).map((item) => {
            return new Item(item[0], item[1].name, item[1].sizes, item[1].description, item[1].price, item[1].currency, item[1].image);
          })
          subscriber.next(this.sortItems(this.cacheItems, this.filter));
        });

      } else {
        subscriber.next(this.sortItems(this.cacheItems, this.filter));
      }

      this.filterObs!.subscribe(
        (filter: string) => {
          subscriber.next(this.sortItems(this.cacheItems, filter));
        }
      );
    } );
  }

  getItem(id: string): Observable<any> {
    //If cacheItems = [] -> fetches, stores and provides item with observable
    // If cacheItems populated, provides item with observable
    var item = this.cacheItems.find((item) => {return item.id === id});
    if (item) {
      return new Observable<Item>((subscriber) => {subscriber.next(item)})
    } else {
      return this.http.get("https://angular-shop-3ec7e-default-rtdb.europe-west1.firebasedatabase.app/items/" + id + ".json").pipe(map((data) => {
        var newitem = <Item> data;
        return new Item(id, newitem.name, newitem.sizes, newitem.description, newitem.price, newitem.currency, newitem.image);
      }));
    }
  }

  private sortItems(items: Item[], filter: string): Item[] {
    if (filter === "price-up") return [...items].sort((a: Item, b: Item) => {
      return a.price - b.price;
    });

    if (filter === "price-down") return [...items].sort((a: Item, b: Item) => {
      return b.price - a.price;
    });

    if (filter === "popular") return [...items];
    return [...items];

  }

}

