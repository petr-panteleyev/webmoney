/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createAction, props} from "@ngrx/store";
import {MonthAndYear} from "./app-state";

export const setTransactionMonthAndDate = createAction(
  '[App State] Set transaction view month and year',
  props<{ monthAndYear: MonthAndYear }>()
)

export const setStartingYear = createAction(
  '[App State] Set starting year',
  props<{ year: number }>()
)
