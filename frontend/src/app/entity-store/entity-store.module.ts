/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultDataServiceConfig, EntityDataModule, EntityDataModuleConfig, EntityMetadataMap} from "@ngrx/data";
import {Currency} from "../model/currency";
import {Category} from "../model/category";
import {Account} from "../model/account";
import {Contact} from "../model/contact";

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "http://localhost:8080/money/api/1.0.0"
}

export const entityMetadata: EntityMetadataMap = {
  Currency: {
    selectId: (model: Currency) => model.uuid
  },
  Category: {
    selectId: (model: Category) => model.uuid
  },
  Account: {
    selectId: (model: Account) => model.uuid
  },
  Contact: {
    selectId: (model: Contact) => model.uuid
  }
};

export const pluralNames = {
  Currency: 'Currency',
  Category: 'Category',
  Account: 'Account',
  Contact: 'Contact'
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    {
      provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig
    }
  ]
})
export class EntityStoreModule {
}
