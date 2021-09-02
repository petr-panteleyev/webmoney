/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryDto, CategoryType} from "../model/category-dto";
import {DataCacheService} from "../data-cache.service";
import {AccountDto} from "../model/account-dto";

class CategoryTypeSelection {
  constructor(public name: string, public types: Array<CategoryType>) {
  }
}

export interface CategoryListItem {
  uuid: string,
  name: string
}

@Component({
  selector: 'app-category-selection-box',
  templateUrl: './category-selection-box.component.html',
  styleUrls: ['./category-selection-box.component.css']
})
export class CategorySelectionBoxComponent implements OnInit {
  @Output() accountFilter = new EventEmitter<(a: AccountDto) => unknown>()

  allCategoriesLabel : CategoryListItem = { uuid: "", name : "All Categories" }

  showDeactivatedAccounts = false

  combinedCategoryTypeOptions: CategoryTypeSelection[] = [
    new CategoryTypeSelection(
      "Accounts, cash, cards",
      [CategoryType.BANKS_AND_CASH, CategoryType.DEBTS]
    ),
    new CategoryTypeSelection(
      "Incomes and Expenses",
      [CategoryType.INCOMES, CategoryType.EXPENSES]
    )
  ]
  categoryTypeOptions: CategoryTypeSelection[] = [
    new CategoryTypeSelection("Banks", [CategoryType.BANKS_AND_CASH]),
    new CategoryTypeSelection("Incomes", [CategoryType.INCOMES]),
    new CategoryTypeSelection("Expenses", [CategoryType.EXPENSES])
  ]

  selectedOption = this.combinedCategoryTypeOptions[0]
  selectedCategory: CategoryListItem = this.allCategoriesLabel
  categories: CategoryListItem[] = []

  constructor(private dataCache: DataCacheService) {
  }

  categoryTypeSelected(selection: CategoryTypeSelection) {
    this.categories = this.dataCache.getCategories()
      .filter((c: CategoryDto) => selection.types.find((type: CategoryType) => c.type == type) != undefined)
      .sort((c1, c2) => c1.name.localeCompare(c2.name))
    this.selectedCategory = this.allCategoriesLabel
    this.accountFilter.emit(
      this.generateAccountFilter(this.showDeactivatedAccounts, selection, this.allCategoriesLabel)
    )
  }

  onShowDeactivatedAccount(state: boolean) {
    this.accountFilter.emit(
      this.generateAccountFilter(state, this.selectedOption, this.selectedCategory)
    )
  }

  onCategorySelected(category: any) {
    this.accountFilter.emit(
      this.generateAccountFilter(this.showDeactivatedAccounts, this.selectedOption, category)
    )
  }

  private generateAccountFilter(showDeactivated: boolean, selectedOption: CategoryTypeSelection, selectedCategory: CategoryListItem) {
    if (selectedCategory.uuid.length != 0) {
      return (a: AccountDto) => (a.enabled || showDeactivated) && (a.categoryUuid == selectedCategory.uuid)
    } else if (selectedOption != undefined) {
      return (a: AccountDto) => (a.enabled || showDeactivated) && selectedOption.types.includes(a.type)
    } else {
      return (a: AccountDto) => a.enabled || showDeactivated
    }
  }

  ngOnInit(): void {
    this.categoryTypeSelected(this.selectedOption)
  }
}
