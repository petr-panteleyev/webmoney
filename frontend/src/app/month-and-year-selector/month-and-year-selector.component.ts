import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {setTransactionMonthAndDate} from "../state/common-actions";
import {selectStartingYear, selectTransactionMonthAndYear} from "../state/app-state";

@Component({
  selector: 'app-month-and-year-selector',
  templateUrl: './month-and-year-selector.component.html',
  styleUrls: ['./month-and-year-selector.component.css']
})
export class MonthAndYearSelectorComponent implements OnInit {
  endYear = new Date().getFullYear()

  month: number = 0
  year: number = 0

  years : number[] = []
  months: string[] = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь'
  ]

  constructor(private store: Store) {
  }

  onMonthChanged() {
    this.post()
  }

  onYearChanged() {
    this.post()
  }

  prevMonth() {
    let m = this.month - 1
    if (m < 0) {
      m = 11
      this.year = this.year - 1
    }
    this.month = m
    this.post()
  }

  nextMonth() {
    let m = this.month + 1
    if (m == 12) {
      m = 0
      this.year = this.year + 1
    }
    this.month = m
    this.post()
  }

  thisMonth() {
    let d = new Date()
    this.month = d.getMonth()
    this.year = d.getFullYear()
    this.post()
  }

  private post() {
    this.store.dispatch(
      setTransactionMonthAndDate({
        monthAndYear: {
          month: this.month,
          year: this.year
        }
      })
    )
  }

  ngOnInit(): void {
    this.store.select(selectTransactionMonthAndYear).subscribe((monthAndYear) => {
      this.month = monthAndYear.month
      this.year = monthAndYear.year
    })

    this.store.select(selectStartingYear).subscribe((year) => {
      this.years = Array(this.endYear - year + 1)
        .fill(1)
        .map((x, i) => year + i)
    })
  }
}
