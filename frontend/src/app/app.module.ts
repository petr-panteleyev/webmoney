import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { CategoryViewComponent } from './category-view/category-view.component';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { CurrencyViewComponent } from './currency-view/currency-view.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryViewComponent,
    AccountsViewComponent,
    AccountsPageComponent,
    CurrencyViewComponent,
    TransactionViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
