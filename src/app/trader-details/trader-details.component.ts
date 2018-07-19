import { Component, OnInit } from '@angular/core';
import {TradersService} from '../traders.service';
import {Trader} from '../domain/Trader';
import {Trade} from '../domain/Trade';
import {MarketServiceImpl} from '../market.service';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import { switchMap } from 'rxjs/operators';
import {Stock} from '../domain/Stock';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {
  trader: Trader;

  selectedStock: Stock;

  symbolInput: FormControl = new FormControl();
  countInput: FormControl = new FormControl();

  constructor(private tradersService: TradersService,
              private marketService: MarketServiceImpl,
              private route: ActivatedRoute,
              private location: Location) {
    this.trader = new Trader('');
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.tradersService.getTrader(params.get('name'))))
      .subscribe((trader: Trader) => this.trader = trader);
  }

  onStockSelect(stock: Stock) {
    this.selectedStock = stock;
  }

  buyStock() {
    if (this.selectedStock == null) {
      window.alert('Please select the stock');
      return;
    }
    const trade: Trade =
      this.marketService.buyStock(this.selectedStock.getSymbol(),
        this.countInput.value);
    this.trader.addToPortfolio(trade);
    this.selectedStock = null;
  }

  closeTrade(trade: Trade) {
    this.marketService.sellStock(trade);
  }

  goBack(): void {
    this.location.back();
  }
}
