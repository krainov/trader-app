import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/routing.module';

import { TradersService } from './traders.service';
import { MarketServiceImpl } from './market.service';

import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { TradersComponent } from './traders/traders.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    TradersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TradersService,
    MarketServiceImpl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
