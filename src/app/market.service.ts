import { Injectable } from '@angular/core';
import { Stock } from './domain/Stock';

@Injectable()
export class MarketServiceImpl implements MarketService {
  stocks: Stock[];

  private counter: number;

  constructor() { this.stocks = this.getMockStocks(); }

  private getMockStocks(): Stock[] {
    const stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing', this));
    stocks.push(new Stock('CAT', 'Caterpillar', this));
    stocks.push(new Stock('KO', 'Coca-Cola', this));
    return stocks;
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  addStock(symbol: string, company: string) {
  }

  add(symbol: string, company: string) {
    this.stocks.push(new Stock(symbol, company, this));
  }

  getPrice(symbol: string): number {
    return Math.random() * 1000 * symbol.length;
  }

  getUpdatedPrice(currentPrice: number): number {
    let multiplier = 1;
    this.counter++;

    if (this.counter % 2 == 0) {
      multiplier = -1;
    }
    return Math.round((currentPrice + (Math.random() * multiplier))
      * 100 + Number.EPSILON) / 100;
  }
}

export interface MarketService {
  getPrice(symbol: string): number;
  getUpdatedPrice(currentPrice: number): number;
  getStocks(): Stock[];
  addStock(symbol: string, company: string);
}
