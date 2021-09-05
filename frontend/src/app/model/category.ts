/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
export enum CategoryType {
    BANKS_AND_CASH = "BANKS_AND_CASH",
    INCOMES = "INCOMES",
    EXPENSES = "EXPENSES",
    DEBTS = "DEBTS",
    PORTFOLIO = "PORTFOLIO",
    ASSETS = "ASSETS",
    STARTUP = "STARTUP"
}

export class Category {
  constructor(
    public uuid: string,
    public name: string,
    public comment: string,
    public iconUuid: string,
    public type: CategoryType
    ) {
  }
}
