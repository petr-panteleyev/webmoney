/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {EntityHttpResourceUrls, HttpUrlGenerator} from "@ngrx/data";
import {Dictionary} from "@ngrx/entity";

export class CustomHttpUrlGenerator extends HttpUrlGenerator {
  private enpointMap: Dictionary<string> = {
    "Account": "/accounts",
    "Category": "/categories",
    "Contact": "/contacts",
    "Currency": "/currencies",
    "Transaction" : "/transactions",
    "Icon" : "/icons"
  }

  collectionResource(entityName: string, root: string): string {
    return `${root}${(this.enpointMap[entityName] || "")}`
  }

  entityResource(entityName: string, root: string): string {
    return this.collectionResource(entityName, root) + "/"
  }

  registerHttpResourceUrls(entityHttpResourceUrls?: EntityHttpResourceUrls): void {
  }
}
