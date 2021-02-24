import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  private item: Item | undefined;
  private loading = true;

  constructor(private itemsService: ItemsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((value) => {
      this.itemsService.getItem(value.id).subscribe((item) => {
        this.item = item;
        this.loading = false;
      });
    })
  }

}
