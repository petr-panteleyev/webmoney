/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Store} from "@ngxs/store";
import {CategoryDto} from "./model/category-dto";
import {BehaviorSubject, Observable} from "rxjs";
import {CurrencyDto} from "./model/currencyDto";
import {AccountDto} from "./model/account-dto";

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  private currencies = new Array<CurrencyDto>(0)
  private categories = new Array<CategoryDto>(0)
  private accounts = new Array<AccountDto>(0)

  private currSubj = new BehaviorSubject<CurrencyDto[]>(this.currencies)
  private catSubj = new BehaviorSubject<CategoryDto[]>(this.categories)
  private accSubj = new BehaviorSubject<AccountDto[]>(this.accounts)

  constructor(private http: HttpService, private store: Store) {
  }

  getCurrencies(): Observable<CurrencyDto[]> {
    return this.currSubj.asObservable()
  }

  getCategoriesObservable(): Observable<CategoryDto[]> {
    return this.catSubj.asObservable()
  }

  getAccountsObservable(): Observable<AccountDto[]> {
    return this.accSubj.asObservable()
  }

  getAccounts(): AccountDto[] {
    return this.accounts
  }

  getCategories(): CategoryDto[] {
    return this.categories
  }

  getCategory(uuid: string): CategoryDto | null {
    return DataCacheService.getItem(this.categories, uuid)
  }

  getCurrency(uuid: string): CurrencyDto | null {
    return DataCacheService.getItem(this.currencies, uuid)
  }

  private static getItem(arr: Array<any>, uuid: string): any {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].uuid == uuid) {
        return arr[i]
      }
    }
    return null
  }


  preload() {
    this.http.getCurrencies().subscribe(
      (data: CurrencyDto[]) => {
        this.currencies.length = 0
        this.currencies.push(...data)
        this.currSubj.next(this.currencies)
      }
    )

    this.http.getCategories().subscribe(
      (data: CategoryDto[]) => {
        this.categories.length = 0
        this.categories.push(...data)
        this.catSubj.next(this.categories)
      }
    )

    this.http.getAccounts().subscribe(
      (data: AccountDto[]) => {
        this.accounts.length = 0
        this.accounts.push(...data)
        this.accSubj.next(this.accounts)
      }
    )
  }
}
