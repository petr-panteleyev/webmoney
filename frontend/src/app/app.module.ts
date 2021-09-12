/*
 Copyright (c) Petr Panteleyev. All rights reserved.
 Licensed under the BSD license. See LICENSE file in the project root for full license information.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';

import {CategoryViewComponent} from './category-view/category-view.component';
import {AccountsViewComponent} from './accounts-view/accounts-view.component';
import {AccountsPageComponent} from './accounts-page/accounts-page.component';
import {CurrencyViewComponent} from './currency-view/currency-view.component';
import {TransactionViewComponent} from './transaction-view/transaction-view.component';
import {CategorySelectionBoxComponent} from './category-selection-box/category-selection-box.component';
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {EntityStoreModule} from "./entity-store/entity-store.module";
import {ContactsViewComponent} from './contacts-view/contacts-view.component';
import {HttpUrlGenerator} from "@ngrx/data";
import {CustomHttpUrlGenerator} from "./custom-http-url-generator";
import {applicationStateReducer} from "./state/app-state";
import {MonthAndYearSelectorComponent} from './month-and-year-selector/month-and-year-selector.component';
import {CurrencyDialogComponent} from './dialogs/currency-dialog/currency-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {DataEffects} from "./state/data-effects";
import {DialogEffects} from "./state/dialog-actions";

@NgModule({
  declarations: [
    AppComponent,
    CategoryViewComponent,
    AccountsViewComponent,
    AccountsPageComponent,
    CurrencyViewComponent,
    TransactionViewComponent,
    CategorySelectionBoxComponent,
    ContactsViewComponent,
    MonthAndYearSelectorComponent,
    CurrencyDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    StoreModule.forRoot({
      app: applicationStateReducer
    }, {}),
    EffectsModule.forRoot([DataEffects, DialogEffects]),
    EntityStoreModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HttpUrlGenerator,
      useClass: CustomHttpUrlGenerator
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
