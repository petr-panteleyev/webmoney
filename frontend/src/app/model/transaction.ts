/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */

import {Dictionary} from "@ngrx/entity";

export enum TransactionType {
  CARD_PAYMENT = "CARD_PAYMENT",
  CASH_PURCHASE = "CASH_PURCHASE",
  CHEQUE = "CHEQUE",
  WITHDRAWAL = "WITHDRAWAL",
  CACHIER = "CACHIER",
  DEPOSIT = "DEPOSIT",
  TRANSFER = "TRANSFER",
  INTEREST = "INTEREST",
  DIVIDEND = "DIVIDEND",
  DIRECT_BILLING = "DIRECT_BILLING",
  CHARGE = "CHARGE",
  FEE = "FEE",
  INCOME = "INCOME",
  SALE = "SALE",
  REFUND = "REFUND",
  UNDEFINED = "UNDEFINED"
}

const typeTranslation: Dictionary<string> = {
  CARD_PAYMENT : "Оплата по карте",
  CASH_PURCHASE : "Покупка за наличные",
  CHEQUE : "Чек",
  WITHDRAWAL : "Снятие наличных",
  CACHIER : "Транзакция в банкомате",
  DEPOSIT : "Депозит",
  TRANSFER : "Перевод",
  INTEREST : "Проценты",
  DIVIDEND : "Дивиденды",
  DIRECT_BILLING : "Прямое дебетование",
  CHARGE : "Списание",
  FEE :"Комиссия",
  INCOME : "Доход",
  SALE : "Продажа",
  REFUND : "Возврат",
  UNDEFINED : "Неизвестно"
}

export class Transaction {
  constructor(
    public uuid: string,
    public type: TransactionType,
    public comment: string,
    public day: number,
    public month: number,
    public year: number,
    public accountDebitedUuid: string,
    public accountCreditedUuid: string,
    public contactUuid: string,
    public checked: boolean,
    public amount: number,
  ) {
  }

  static getTypeString(type: TransactionType): string {
    return typeTranslation[type] || type
  }
}
