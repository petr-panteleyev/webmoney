import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';

import {NgxsModule} from '@ngxs/store';

import {CategoryViewComponent} from './category-view/category-view.component';
import {AccountsViewComponent} from './accounts-view/accounts-view.component';
import {AccountsPageComponent} from './accounts-page/accounts-page.component';
import {CurrencyViewComponent} from './currency-view/currency-view.component';
import {TransactionViewComponent} from './transaction-view/transaction-view.component';
import {CategoryState} from "./model/category-state";
import { CategorySelectionBoxComponent } from './category-selection-box/category-selection-box.component';
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    CategoryViewComponent,
    AccountsViewComponent,
    AccountsPageComponent,
    CurrencyViewComponent,
    TransactionViewComponent,
    CategorySelectionBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    NgxsModule.forRoot([CategoryState]),
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
