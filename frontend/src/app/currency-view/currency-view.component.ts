/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Currency} from "../model/currency";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CurrencyService} from "../entity-store/currency-service";

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'description'];

  dataSource = new MatTableDataSource<Currency>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.entities$.subscribe((data: Currency[]) => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
