import {Component, OnInit} from '@angular/core';
import {CategoryDto} from '../model/category-dto';
import {DataCacheService} from "../data-cache.service";

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css']
})
export class CategoryViewComponent implements OnInit {
  columnDefs = [
    {
      field: 'uuid',
      flex: 1
    },
    {
      field: 'name',
      sortable: true,
      filter: 'agTextColumnFilter',
      resizable: true,
      flex: 1
    },
    {
      field: 'type',
      sortable: true,
      flex: 1
    },
    {
      field: 'comment',
      flex: 2
    }
  ];

  rowData: CategoryDto[] = []

  constructor(private dataCache: DataCacheService) {
  }

  ngOnInit(): void {
    this.dataCache.getCategoriesObservable().subscribe((data: CategoryDto[]) => {
      this.rowData.length = 0
      this.rowData.push(...data)
    })
  }
}
