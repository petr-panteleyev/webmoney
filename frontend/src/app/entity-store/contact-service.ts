/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Contact} from "../model/contact";

@Injectable({providedIn: 'root'})
export class ContactService extends EntityCollectionServiceBase<Contact> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Contact', serviceElementsFactory);
  }
}
