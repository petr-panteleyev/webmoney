import {Component, Inject, OnInit} from '@angular/core';
import {Currency} from "../../model/currency";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

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

  getResult(): Currency {
    let value = this.form.value
    return new Currency(
      this.currency == undefined ? "" : this.currency.uuid,
      value.symbol,
      value.description,
      value.rate,
      value.useThousandSeparator,
      value.def,
      value.direction
    )
  }

  onOk() {
    if (this.form.invalid) {
      return
    }

    this.dialogRef.close(this.getResult())
  }

  onCancel() {
    this.dialogRef.close()
  }

  ngOnInit() {
    this.form = this.fb.group({
      symbol: [this.currency?.symbol || "", [Validators.required]],
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
