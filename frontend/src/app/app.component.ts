import { Component } from '@angular/core';
import {DataCacheService} from "./data-cache.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Money Manager';

  showTransactions = true
  showAccounts = false

  constructor(private dataCache: DataCacheService) {
  }

  onTransactions() {
    this.showTransactions = true
    this.showAccounts = false
  }

  onAccounts() {
    this.showTransactions = false
    this.showAccounts = true
  }

  ngOnInit(): void {
    this.dataCache.preload()
  }
}
