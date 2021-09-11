import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {setTransactionMonthAndDate} from "../state/common-actions";
import {selectTransactionMonthAndYear} from "../state/app-state";

@Component({
  selector: 'app-month-and-year-selector',
  templateUrl: './month-and-year-selector.component.html',
  styleUrls: ['./month-and-year-selector.component.css']
})
export class MonthAndYearSelectorComponent implements OnInit {
  monthString = ""

  month: number = 0
  year: number = 0

  constructor(private store: Store) {
  }

  onDateChanged() {
    this.year = Number(this.monthString.substr(0, 4))
    this.month = Number(this.monthString.substr(5)) - 1
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

  private static makeDateString(month: number, year: number) : string {
    let m = month + 1
    return `${year}-` + (m < 10 ? `0${m}` : `${m}`)
  }

  ngOnInit(): void {
    this.store.select(selectTransactionMonthAndYear).subscribe((monthAndYear) => {
      this.monthString = MonthAndYearSelectorComponent.makeDateString(monthAndYear.month, monthAndYear.year)
      this.month = monthAndYear.month
      this.year = monthAndYear.year
    })
  }
}
