import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {ItemsList} from "../items-list";
import {tap} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items!: ItemsList;

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.dataService.items()
      .pipe(
        tap(items => {
          this.items = items;
        })
      )
      .subscribe()
  }

}
