/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit} from '@angular/core';
import {DataCacheService} from "../data-cache.service";
import {CurrencyDto} from "../model/currencyDto";

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {

  columnDefs = [
    {
      field: 'uuid',
      flex: 1
    },
    {
      field: 'symbol',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      flex: 1
    },
    {
      field: 'description',
      sortable: true,
      flex: 1
    }
  ];


  rowData: CurrencyDto[] = []

  constructor(private dataCache: DataCacheService) {
  }

  ngOnInit(): void {
    this.dataCache.getCurrencies().subscribe((data: CurrencyDto[]) => {
      this.rowData.length = 0
      this.rowData.push(...data)
    })
  }

}
