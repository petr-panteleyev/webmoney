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
import {DefaultDataServiceConfig, HttpUrlGenerator} from "@ngrx/data";
import {CategoryService} from "../entity-store/category-service";
import {Category} from "../model/category";
import {Store} from "@ngrx/store";
import {selectTransactionMonthAndYear} from "../state/app-state";
import {setStartingYear} from "../state/common-actions";

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
    public counterPartyIconUuid: string | undefined,
    public checked: boolean,
    public amount: number,
    public debtorIconUuid: string | undefined,
    public creditorIconUuid: string | undefined
  ) {
  }
}

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {
  private categoryMap: Dictionary<Category> = {}
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

  month: number = 0
  year: number = 0

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private store: Store,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private contactService: ContactService,
    private transationService: TransactionService,
    private urlGenerator: HttpUrlGenerator,
    private dataServiceConfig: DefaultDataServiceConfig
  ) {
  }

  private filterAndConvert(transactions: Transaction[]): TransactionListItem[] {
    return transactions
      .filter((t) => t.month == this.month + 1 && t.year == this.year)
      .map((t) => {
        let debitedAccount = this.accountMap[t.accountDebitedUuid]
        let creditedAccount = this.accountMap[t.accountCreditedUuid]

        let debitedIcon = debitedAccount?.iconUuid
        if (debitedIcon == undefined) {
          debitedIcon = this.categoryMap[debitedAccount?.categoryUuid||""]?.iconUuid
        }

        let creditedIcon = creditedAccount?.iconUuid
        if (creditedIcon == undefined) {
          creditedIcon = this.categoryMap[creditedAccount?.categoryUuid||""]?.iconUuid
        }

        let counterParty = this.contactMap[t.contactUuid]

        return new TransactionListItem(
          t.uuid,
          Transaction.getTypeString(t.type),
          t.comment,
          t.day,
          t.month,
          t.year,
          debitedAccount?.name || "",
          creditedAccount?.name || "",
          counterParty?.name || "",
          counterParty?.iconUuid,
          t.checked,
          t.amount,
          debitedIcon,
          creditedIcon
        )
      })
  }

  ngOnInit(): void {
    this.categoryService.entityMap$.subscribe((data) => {
      this.categoryMap = data
      this.dataSource.data = this.filterAndConvert(this.transactions)
    })

    this.accountService.entityMap$.subscribe((data) => {
      this.accountMap = data
      this.dataSource.data = this.filterAndConvert(this.transactions)
    })

    this.contactService.entityMap$.subscribe((data) => {
      this.contactMap = data
      this.dataSource.data = this.filterAndConvert(this.transactions)
    })

    this.transationService.entities$.subscribe((data) => {
      this.transactions = data
      this.dataSource.data = this.filterAndConvert(data)

      // This must be an effect
      let minYear = Math.min(...data.map((t => t.year)))
      if (minYear != Infinity) {
        this.store.dispatch(
          setStartingYear({
            year: minYear
          })
        )
      }
    })

    this.store.select(selectTransactionMonthAndYear).subscribe((monthAndYear) => {
      this.month = monthAndYear.month
      this.year = monthAndYear.year
      this.dataSource.data = this.filterAndConvert(this.transactions)
    })
  }

  getIconUrl(uuid: string) {
    if (uuid == undefined) {
      return "/assets/empty.png"
    } else {
      return `${this.urlGenerator.collectionResource("Icon", this.dataServiceConfig.root || "")}/${uuid}/bytes`
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
