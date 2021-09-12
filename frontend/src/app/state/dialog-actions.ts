/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {createAction, props} from "@ngrx/store";
import {ActionType} from "./action-type";
import {Currency} from "../model/currency";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CurrencyDialogComponent} from "../dialogs/currency-dialog/currency-dialog.component";
import {createCurrencyAction, updateCurrencyAction} from "./data-actions";

export const openCurrencyDialogAction = createAction(
  ActionType.OPEN_CURRENCY_DIALOG,
  props<{ currency: Currency | undefined }>()
)

@Injectable()
export class DialogEffects {
  openCurrencyDialog$ = createEffect(() => this.actions$.pipe(
    ofType(openCurrencyDialogAction),
    switchMap(action => this.dialog.open(CurrencyDialogComponent, {
        data: {currency: action.currency}
      }).afterClosed().pipe(
        filter(result => result != undefined),
        map(
          (result: Currency) => result.uuid == "" ?
            createCurrencyAction({currency: result}) :
            updateCurrencyAction({currency: result})
        )
      )
    ))
  )

  constructor(private actions$: Actions, private dialog: MatDialog) {
  }
}
