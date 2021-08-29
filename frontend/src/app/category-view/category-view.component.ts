import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { HttpService } from '../http.service';

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

  rowData: Category[] = []

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.http.getCategories().subscribe(
        (data:Category[]) => this.rowData = data
    )
  }
}
