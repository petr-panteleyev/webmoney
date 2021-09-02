/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AccountDto, CardType} from "../model/account-dto";
import {DataCacheService} from "../data-cache.service";
import {formatDate} from "@angular/common";
import {GridReadyEvent} from "ag-grid-community";

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

  rowData: AccountView[] = []

  columnDefs = [
    {
      field: 'name',
      floatingFilter: true,
      filter: true,
      suppressMenu: true,
      flex: 1,
    },
    {
      field: 'category',
      flex: 1
    },
    {
      field: 'currency',
      flex: 1
    },
    {
      field: 'card',
      flex: 1,
      cellRenderer: function (params: any) {
        if (params.value.type == CardType.NONE || params.value.type == CardType.MIR) {
          return `${params.value.number}</span>`
        } else {
          return `<span><img alt="" src="assets/${params.value.getCardIcon()}">${params.value.number}</span>`
        }
      }
    },
    {
      field: 'interest',
      flex: 1
    },
    {
      field: 'until',
      flex: 1
    },
    {
      field: 'comment',
      flex: 1
    },
    {
      field: 'total',
      flex: 1
    },
    {
      field: 'waiting',
      flex: 1
    },
  ]

  constructor(private dataCache: DataCacheService, @Inject(LOCALE_ID) private locale: string) {
  }

  private convertWithFilter(dto: AccountDto[], predicate: (value: AccountDto) => unknown): AccountView[] {
    return dto
      .filter(predicate)
      .map((acc: AccountDto) => new AccountView(
        acc.name,
        this.dataCache.getCurrency(acc.currencyUuid)?.symbol || "",
        this.dataCache.getCategory(acc.categoryUuid)?.name || "",
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

  private formatClosingDate(dto: AccountDto): string {
    if (dto.closingDate == undefined) {
      return ""
    }

    if (dto.cardNumber.length != 0) {
      return formatDate(dto.closingDate, 'MM/yy', this.locale)
    } else {
      return formatDate(dto.closingDate, 'dd.MM.yyyy', this.locale)
    }
  }

  onAccountFilterUpdate(filter: (a: AccountDto) => unknown) {
    this.rowData = this.convertWithFilter(this.dataCache.getAccounts(), filter)
  }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

}
