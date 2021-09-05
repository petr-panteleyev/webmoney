/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactService} from "../entity-store/contact-service";
import {MatTableDataSource} from "@angular/material/table";
import {Contact} from "../model/contact";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.css']
})
export class ContactsViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'phone'];

  dataSource = new MatTableDataSource<Contact>([])

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.contactService.entities$.subscribe((data) => {
      this.dataSource.data = data
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
