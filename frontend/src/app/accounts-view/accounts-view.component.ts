/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {Account, CardType} from "../model/account";
import {DataCacheService} from "../data-cache.service";
import {formatDate} from "@angular/common";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {CurrencyService} from "../entity-store/currency-service";
import {Dictionary} from "@ngrx/entity";
import {Currency} from "../model/currency";
import {Category} from "../model/category";
import {CategoryService} from "../entity-store/category-service";
import {AccountService} from "../entity-store/account-service";

class CardCell {
  constructor(public number: string, public type: CardType) {
  }

  getCardIcon(): string {
    switch (this.type) {
      case CardType.AMEX:
        return "amex.png"
      case CardType.MASTERCARD:
        return "mastercard.png"
      case CardType.MIR:
        return "mir.png"
      case CardType.VISA:
        return "visa.png"
      default:
        return ""
    }
  }
}

class AccountView {
  constructor(
    public name: string,
    public currency: string,
    public category: string,
    public card: CardCell,
    public comment: string,
    public interest: string,
    public total: number,
    public waiting: number,
    public until: string
  ) {
  }
}

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'currency', 'card', 'interest',
    'until',
    'comment', 'total', 'waiting'
  ];

  currencyMap: Dictionary<Currency> = {}
  categoryMap: Dictionary<Category> = {}
  accounts: Account[] = []
  accountFilter: (a: Account) => unknown = (value: Account) => true

  dataSource = new MatTableDataSource<AccountView>([])
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort

  constructor(
    private dataCache: DataCacheService,
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  private convertWithFilter(dto: Account[], predicate: (value: Account) => unknown): AccountView[] {
    return dto
      .filter(predicate)
      .map((acc: Account) => new AccountView(
        acc.name,
        this.currencyMap[acc.currencyUuid]?.symbol || "",
        this.categoryMap[acc.categoryUuid]?.name || "",
        new CardCell(
          acc.cardNumber,
          acc.cardType
        ),
        acc.comment,
        acc.interest != 0 ? (acc.interest.toString() + "%") : "",
        acc.total,
        acc.totalWaiting,
        this.formatClosingDate(acc)
      ))
  }

  private formatClosingDate(dto: Account): string {
    if (dto.closingDate == undefined) {
      return ""
    }

    if (dto.cardNumber.length != 0) {
      return formatDate(dto.closingDate, 'MM/yy', this.locale)
    } else {
      return formatDate(dto.closingDate, 'dd.MM.yyyy', this.locale)
    }
  }

  onAccountFilterUpdate(filter: (a: Account) => unknown) {
    this.accountFilter = filter
    this.updateDataSource()
  }

  ngOnInit(): void {
    this.currencyService.entityMap$.subscribe((map) => {
      this.currencyMap = map
      this.updateDataSource()
    })
    this.categoryService.entityMap$.subscribe((map) => {
      this.categoryMap = map
      this.updateDataSource()
    })
    this.accountService.entities$.subscribe((data) => {
      this.accounts = data
      this.updateDataSource()
    })
  }

  private updateDataSource() {
    console.log("*** UPDATE DATASOURCE")
    this.dataSource.data = this.convertWithFilter(this.accounts, this.accountFilter)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
