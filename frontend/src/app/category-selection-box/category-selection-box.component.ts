/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category, CategoryType} from "../model/category";
import {DataCacheService} from "../data-cache.service";
import {Account} from "../model/account";
import {CategoryService} from "../entity-store/category-service";

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
  @Output() accountFilter = new EventEmitter<(a: Account) => unknown>()

  allCategoriesLabel: CategoryListItem = {uuid: "", name: "All Categories"}

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

  categories: Category[] = []

  selectedOption = this.combinedCategoryTypeOptions[0]
  selectedCategory: CategoryListItem = this.allCategoriesLabel
  listItems: CategoryListItem[] = []

  constructor(private dataCache: DataCacheService, private categoryService: CategoryService) {
  }

  categoryTypeSelected(selection: CategoryTypeSelection) {
    this.listItems = this.categories
      .filter((c: Category) => selection.types.find((type: CategoryType) => c.type == type) != undefined)
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
      return (a: Account) => (a.enabled || showDeactivated) && (a.categoryUuid == selectedCategory.uuid)
    } else if (selectedOption != undefined) {
      return (a: Account) => (a.enabled || showDeactivated) && selectedOption.types.includes(a.type)
    } else {
      return (a: Account) => a.enabled || showDeactivated
    }
  }

  private resetComponents(categories: Category[]) {
    this.categories = categories
    this.selectedOption = this.combinedCategoryTypeOptions[0]
    this.categoryTypeSelected(this.selectedOption)
  }

  ngOnInit(): void {
    this.categoryService.entities$.subscribe((data) => {
      this.resetComponents(data)
    })

    this.categoryTypeSelected(this.selectedOption)
  }
}
