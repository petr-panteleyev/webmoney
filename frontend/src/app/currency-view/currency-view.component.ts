/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Currency} from "../model/currency";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CurrencyService} from "../entity-store/currency-service";
import {MatDialog} from "@angular/material/dialog";
import {CurrencyDialogComponent} from "../dialogs/currency-dialog/currency-dialog.component";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-currency-view',
  templateUrl: './currency-view.component.html',
  styleUrls: ['./currency-view.component.css']
})
export class CurrencyViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'symbol', 'description'];

  // Selection
  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<Currency>(this.allowMultiSelect, this.initialSelection);

  dataSource = new MatTableDataSource<Currency>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private currencyService: CurrencyService, public dialog: MatDialog) {
  }

  onNew() {
    const dialogRef = this.dialog.open(CurrencyDialogComponent, {
      data: { currency: undefined }
    })
  }

  onEdit() {
    const dialogRef = this.dialog.open(CurrencyDialogComponent, {
      data: { currency: this.selection.selected[0] || undefined }
    })
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
