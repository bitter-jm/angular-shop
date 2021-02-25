import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';

import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Item } from './item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  filter: string | undefined;
  loading = true;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.itemsService.getItems().subscribe((items) => {
      this.items = items;
      this.loading = false;

    });
    this.filter = this.itemsService.getActiveFilter();
  }

  onFilterChange(event: Event) {
    const target = <HTMLSelectElement> event.target;
    this.itemsService.changeFilter(target.value);
  }

}

