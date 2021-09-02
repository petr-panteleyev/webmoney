export enum CategoryType {
    BANKS_AND_CASH = "BANKS_AND_CASH",
    INCOMES = "INCOMES",
    EXPENSES = "EXPENSES",
    DEBTS = "DEBTS",
    PORTFOLIO = "PORTFOLIO",
    ASSETS = "ASSETS",
    STARTUP = "STARTUP"
}

export class CategoryDto {
  constructor(
    public uuid: string,
    public name: string,
    public comment: string,
    public iconUuid: string,
    public type: CategoryType
    ) {
  }
}
