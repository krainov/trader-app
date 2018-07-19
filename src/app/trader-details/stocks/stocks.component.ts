import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Stock} from '../../domain/Stock';
import {Observable} from 'rxjs';
import {MarketServiceImpl} from '../../market.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})

export class StocksComponent implements OnInit {

  stockInput = new FormControl();
  filteredStocks: Observable<Stock[]>;
  stocks: Stock[];
  selected: Stock;

  @Output()
  onStockSelect = new EventEmitter<Stock>();

  constructor(private marketService: MarketServiceImpl) { }

  ngOnInit() {
    this.stocks = this.marketService.getStocks();
    this.filteredStocks = this.stockInput.valueChanges.pipe(
      startWith(null),
      map(val => val ? this.filter(val) : this.stocks.slice()));

    this.stockInput.valueChanges.pipe(startWith(null)).subscribe(symbol => {
      const stock = this.findStock(symbol);
      if (stock != null) {
        // console.log('-- stock found --> ' + stock.getSymbol());
        this.selected = stock;
        this.onStockSelect.emit(stock);
      }
    });
  }

  findStock(symbol: string): Stock {
    return this.stocks.find(stock => symbol === stock.getSymbol());
  }

  filter(val: string): Stock[] {
    return this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

}
