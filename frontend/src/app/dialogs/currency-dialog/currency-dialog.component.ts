import {Component, Inject, OnInit} from '@angular/core';
import {Currency} from "../../model/currency";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createCurrencyAction, updateCurrencyAction} from "../../state/data-actions";

export interface CurrencyDialogData {
  currency: Currency | undefined
}

@Component({
  selector: 'app-currency-dialog',
  templateUrl: './currency-dialog.component.html',
  styleUrls: ['./currency-dialog.component.css']
})
export class CurrencyDialogComponent implements OnInit {
  // @ts-ignore
  form: FormGroup

  currency: Currency | undefined

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CurrencyDialogData
  ) {
    this.currency = data.currency
  }

  onOk() {
    if (this._symbol?.hasError('required')) {
      return
    }

    let value = this.form.value

    if (this.currency == undefined) {
      this.store.dispatch(createCurrencyAction({
        currency: new Currency(
          "",
          value.symbol,
          value.description,
          value.rate,
          value.useThousandSeparator,
          value.def,
          value.direction
        )
      }))
    } else {
      this.store.dispatch(updateCurrencyAction({
        currency: new Currency(
          this.currency.uuid,
          value.symbol,
          value.description,
          value.rate,
          value.useThousandSeparator,
          value.def,
          value.direction
        )
      }))
    }

    this.dialogRef.close()
  }

  onCancel() {
    this.dialogRef.close()
  }

  ngOnInit() {
    this.form = this.fb.group({
      symbol: [this.currency?.symbol || "", []],
      description: [this.currency?.description || "", []],
      direction: [this.currency?.direction || 0, []],
      def: [this.currency?.def || false, []],
      useThousandSeparator: [this.currency?.useThousandSeparator || false, []],
      rate: [this.currency?.rate || 1, []]
    });
  }

  get _symbol() {
    return this.form.get("symbol")
  }
}
