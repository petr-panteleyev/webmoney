import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryDto} from '../model/category-dto';
import {DataCacheService} from "../data-cache.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  displayedColumns: string[] = ['uuid', 'name', 'type', 'comment'];

  rowData: CategoryDto[] = []
  dataSource = new MatTableDataSource(this.rowData)

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private dataCache: DataCacheService) {
  }

  ngOnInit(): void {
    this.dataCache.getCategoriesObservable().subscribe((data: CategoryDto[]) => {
      this.rowData.length = 0
      this.rowData.push(...data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
