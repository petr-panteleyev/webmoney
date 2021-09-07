/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionService} from "../entity-store/transaction-service";
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../model/transaction";
import {MatSort} from "@angular/material/sort";
import {AccountService} from "../entity-store/account-service";
import {Dictionary} from "@ngrx/entity";
import {Account} from "../model/account";
import {ContactService} from "../entity-store/contact-service";
import {Contact} from "../model/contact";

class TransactionListItem {
  constructor(
    public uuid: string,
    public type: string,
    public comment: string,
    public day: number,
    public month: number,
    public year: number,
    public debtor: string,
    public creditor: string,
    public counterParty: string,
    public checked: boolean,
    public amount: number,
  ) {
  }
}

interface MonthOption {
  index: number,
  name: string
}

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {
  private accountMap: Dictionary<Account> = {}
  private contactMap: Dictionary<Contact> = {}
  private transactions: Transaction[] = []
  dataSource = new MatTableDataSource<TransactionListItem>([])

  displayedColumns: string[] = [
    'day',
    'type',
    'debtor',
    'creditor',
    'counterparty',
    'comment',
    'amount',
    'checked'
  ];

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  years: number[] = []

  day: number
  month: number
  year: number

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private accountService: AccountService,
    private contactService: ContactService,
    private transationService: TransactionService
  ) {
    let today = new Date()
    this.day = today.getDate()
    this.month = today.getMonth()
    this.year = today.getFullYear()
  }

  private filterAndConvert(transactions: Transaction[]): TransactionListItem[] {
    return transactions
      .filter((t) => t.month == this.month + 1 && t.year == this.year)
      .map((t) => new TransactionListItem(
        t.uuid,
        t.type,
        t.comment,
        t.day,
        t.month,
        t.year,
        this.accountMap[t.accountDebitedUuid]?.name || "",
        this.accountMap[t.accountCreditedUuid]?.name || "",
        this.contactMap[t.contactUuid]?.name || "",
        t.checked,
        t.amount
      ))
  }

  onMonthChanged() {
    this.dataSource.data = this.filterAndConvert(this.transactions)
  }

  onYearChanged() {
    this.dataSource.data = this.filterAndConvert(this.transactions)
  }

  ngOnInit(): void {
    this.accountService.entityMap$.subscribe((data) => {
      this.accountMap = data
    })

    this.contactService.entityMap$.subscribe((data) => {
      this.contactMap = data
    })

    this.transationService.entities$.subscribe((data) => {
      this.transactions = data
      let years = this.transactions
        .map((t) => t.year)
      this.years = years.filter((n, i) => years.indexOf(n) === i)
        .sort()

      this.dataSource.data = this.filterAndConvert(data)
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
