/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Injectable} from "@angular/core";
import {CurrencyService} from "../entity-store/currency-service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {createCurrencyAction, updateCurrencyAction} from "./data-actions";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class DataEffects {
  createCurrency$ = createEffect(() => this.actions$.pipe(
      ofType(createCurrencyAction),
      switchMap(action => {
        this.currencyService.add(action.currency)
        return new Observable()
      })
    ),
    {
      dispatch: false
    }
  )

  updateCurrency$ = createEffect(() => this.actions$.pipe(
      ofType(updateCurrencyAction),
      switchMap(action => {
        this.currencyService.update(action.currency)
        return new Observable()
      })
    ), {
      dispatch: false
    }
  )

  constructor(private actions$: Actions,
              private currencyService: CurrencyService) {
  }
}
