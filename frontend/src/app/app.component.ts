import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Money Manager';

  showTransactions = true
  showAccounts = false

  onTransactions() {
    this.showTransactions = true
    this.showAccounts = false
  }

  onAccounts() {
    this.showTransactions = false
    this.showAccounts = true
  }
}
