/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {Component} from '@angular/core';
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
  showContacts = false

  constructor(private dataCache: DataCacheService) {
  }

  onTransactions() {
    this.showTransactions = true
    this.showAccounts = false
    this.showContacts = false
  }

  onAccounts() {
    this.showTransactions = false
    this.showAccounts = true
    this.showContacts = false
  }

  onContacts() {
    this.showTransactions = false
    this.showAccounts = false
    this.showContacts = true
  }

  ngOnInit(): void {
    this.dataCache.preload()
  }
}
