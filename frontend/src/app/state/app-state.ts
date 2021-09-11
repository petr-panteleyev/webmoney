/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {setTransactionMonthAndDate} from "./common-actions";

export interface MonthAndYear {
  month: number
  year: number
}

export interface AppState {
  transactionsMonthAndYear: MonthAndYear
}

export const initialAppState: AppState = {
  transactionsMonthAndYear: {
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  }
}

export const applicationStateReducer = createReducer(
  initialAppState,
  on(setTransactionMonthAndDate, (state, {monthAndYear}) => ({
    ...state,
    transactionsMonthAndYear: monthAndYear
  }))
)

export const selectAppState = createFeatureSelector<AppState>("app")

export const selectTransactionMonthAndYear = createSelector(
  selectAppState,
  (state: AppState) => state.transactionsMonthAndYear
)
