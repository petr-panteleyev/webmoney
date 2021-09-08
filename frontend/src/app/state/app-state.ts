/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {setStartingYear, setTransactionMonthAndDate} from "./common-actions";

export interface MonthAndYear {
  month: number
  year: number
}

export interface AppState {
  startingYear: number
  transactionsMonthAndYear: MonthAndYear
}

export const initialAppState: AppState = {
  startingYear: new Date().getFullYear(),
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
    })
  ),
  on(setStartingYear, (state, {year}) => ({
    ...state,
    startingYear: year
  }))
)

export const selectAppState = createFeatureSelector<AppState>("app")

export const selectTransactionMonthAndYear = createSelector(
  selectAppState,
  (state: AppState) => state.transactionsMonthAndYear
)

export const selectStartingYear = createSelector(
  selectAppState,
  (state: AppState) => state.startingYear
)
