import {CategoryType} from "./category-dto";

export enum CardType {
  NONE = "NONE",
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  MIR = "MIR",
  AMEX = "AMEX"
}

export class AccountDto {
  constructor(
    public uuid: string,
    public name: string,
    public currencyUuid: string,
    public categoryUuid: string,
    public type: CategoryType,
    public cardType: CardType,
    public cardNumber: string,
    public comment: string,
    public interest: number,
    public total: number,
    public totalWaiting: number,
    public enabled: boolean,
    public closingDate: Date
  ) {
  }
}
