/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */

export enum TransactionType {
  CARD_PAYMENT= "CARD_PAYMENT",
  CASH_PURCHASE = "CASH_PURCHASE",
  CHEQUE ="CHEQUE" ,
  WITHDRAWAL = "WITHDRAWAL",
  CACHIER ="CACHIER",
  DEPOSIT  = "DEPOSIT",
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
}
