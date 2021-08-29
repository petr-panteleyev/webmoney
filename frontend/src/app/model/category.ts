enum CategoryType {
    BANKS_AND_CASH,
    INCOMES,
    EXPENSES,
    DEBTS,
    PORTFOLIO,
    ASSETS,
    STARTUP
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
