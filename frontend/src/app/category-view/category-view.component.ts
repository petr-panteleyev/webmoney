/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../model/category';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CategoryService} from "../entity-store/category-service";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  displayedColumns: string[] = ['type', 'name', 'comment'];

  dataSource = new MatTableDataSource<Category>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private categoryService: CategoryService) {
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
