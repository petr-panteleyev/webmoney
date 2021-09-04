/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {DataCacheService} from "../data-cache.service";
import {CurrencyDto} from "../model/currencyDto";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {
  displayedColumns: string[] = ['uuid', 'symbol', 'description'];

  rowData: CurrencyDto[] = []
  dataSource = new MatTableDataSource(this.rowData)

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private dataCache: DataCacheService) {
  }

  ngOnInit(): void {
    this.dataCache.getCurrencies().subscribe((data: CurrencyDto[]) => {
      this.rowData.length = 0
      this.rowData.push(...data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
