/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createAction, props} from "@ngrx/store";
import {Currency} from "../model/currency";
import {Category} from "../model/category";
import {Contact} from "../model/contact";
import {ActionType} from "./action-type";

//
// Category
//

export const createCategoryAction = createAction(
  ActionType.CREATE_CATEGORY,
  props<{ category: Category }>()
)

export const updateCategoryAction = createAction(
  ActionType.UPDATE_CATEGORY,
  props<{ category: Category }>()
)

//
// Contact
//

export const createContactAction = createAction(
  ActionType.CREATE_CONTACT,
  props<{ contact: Contact }>()
)

export const updateContactAction = createAction(
  ActionType.UPDATE_CONTACT,
  props<{ contact: Contact }>()
)

//
// Currency
//

export const createCurrencyAction = createAction(
  ActionType.CREATE_CURRENCY,
  props<{ currency: Currency }>()
)

export const updateCurrencyAction = createAction(
  ActionType.UPDATE_CURRENCY,
  props<{ currency: Currency }>()
)
