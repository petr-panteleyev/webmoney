/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Currency} from "../model/currency";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CurrencyService} from "../entity-store/currency-service";
import {SelectionModel} from "@angular/cdk/collections";
import {Store} from "@ngrx/store";
import {openCurrencyDialogAction} from "../state/dialog-actions";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'symbol', 'description'];

  // Selection
  selection = new SelectionModel<Currency>(false, []);

  dataSource = new MatTableDataSource<Currency>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private store: Store, private currencyService: CurrencyService, private dialog:MatDialog) {
  }

  onNew() {
    this.store.dispatch(openCurrencyDialogAction({
      currency: undefined
    }))
  }

  onEdit() {
    this.store.dispatch(openCurrencyDialogAction({
      currency: this.selection.selected[0]
    }))
  }

  ngOnInit(): void {
    this.currencyService.entities$.subscribe((data: Currency[]) => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  /*
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

   */
}
