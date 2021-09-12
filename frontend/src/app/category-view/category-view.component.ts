/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../model/category';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../entity-store/category-service";
import {SelectionModel} from "@angular/cdk/collections";
import {CurrencyDialogComponent} from "../dialogs/currency-dialog/currency-dialog.component";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'type', 'name', 'comment'];

  // Selection
  selection = new SelectionModel<Category>(false, []);

  dataSource = new MatTableDataSource<Category>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private categoryService: CategoryService) {
  }

  onNew() {
    /*
    const dialogRef = this.dialog.open(CurrencyDialogComponent, {
      data: { currency: undefined }
    })

     */
  }

  onEdit() {
    /*
    const dialogRef = this.dialog.open(CurrencyDialogComponent, {
      data: { currency: this.selection.selected[0] || undefined }
    })
    
     */
  }

  ngOnInit(): void {
    this.categoryService.entities$.subscribe((data) => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
