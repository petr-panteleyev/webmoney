/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryDto} from './model/category-dto';
import {CurrencyDto} from "./model/currencyDto";
import {AccountDto} from "./model/account-dto";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  readonly ROOT = 'http://localhost:8080/money'
  readonly API = '/api/1.0.0'

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<CurrencyDto[]> {
    return this.http.get<CurrencyDto[]>(
      this.ROOT + this.API + '/currencies'
    )
  }

  getCategories(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(
      this.ROOT + this.API + '/categories'
    )
  }

  getAccounts(): Observable<AccountDto[]> {
    return this.http.get<AccountDto[]>(
      this.ROOT + this.API + '/accounts'
    )
  }
}
