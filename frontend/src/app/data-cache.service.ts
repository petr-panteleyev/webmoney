/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from '@angular/core';
import {CurrencyService} from "./entity-store/currency-service";
import {CategoryService} from "./entity-store/category-service";
import {EntityServices} from "@ngrx/data";
import {AccountService} from "./entity-store/account-service";
import {ContactService} from "./entity-store/contact-service";

@Injectable({
  providedIn: 'root'
})
export class DataCacheService {
  constructor(
    private currencyService: CurrencyService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private contactService: ContactService,
    private entityService: EntityServices
  ) {
  }

  preload() {
    this.entityService.reducedActions$.subscribe(res => {
      if (res && res.type) {
        console.log(res)
      }
    })
    this.entityService.entityActionErrors$.subscribe(res => {
      if (res && res.type) {
        console.log(res)
      }
    })

    this.categoryService.getAll()
    this.currencyService.getAll()
    this.accountService.getAll()
    this.contactService.getAll()
  }
}
