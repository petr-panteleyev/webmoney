/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from "@angular/core";
import {Currency} from "../model/currency";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";

@Injectable({providedIn: 'root'})
export class CurrencyService extends EntityCollectionServiceBase<Currency> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Currency', serviceElementsFactory);
  }
}
