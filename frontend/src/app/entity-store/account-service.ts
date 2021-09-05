/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from "@angular/core";
import {Currency} from "../model/currency";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Account} from "../model/account";

@Injectable({providedIn: 'root'})
export class AccountService extends EntityCollectionServiceBase<Account> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Account', serviceElementsFactory);
  }
}
