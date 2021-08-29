import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {

  rowData: any[] = []

  columnDefs = [
    {
      field: 'name',
      flex: 1
    }
  ]

  constructor() { }


  ngOnInit(): void {
  }

}
