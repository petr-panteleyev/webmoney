/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createAction, props} from "@ngrx/store";
import {MonthAndYear} from "./app-state";
import {ActionType} from "./action-type";

export const setTransactionMonthAndDate = createAction(
  ActionType.SET_TRANSACTION_MONTH_AND_YEAR,
  props<{ monthAndYear: MonthAndYear }>()
)
