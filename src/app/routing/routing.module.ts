import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import {TradersComponent} from '../traders/traders.component';
import {MarketComponent} from '../market/market.component';

const routes: Routes = [
  { path: '', redirectTo: '/market', pathMatch: 'full' },
  { path: 'traders', component: TradersComponent },
  { path: 'market', component: MarketComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
