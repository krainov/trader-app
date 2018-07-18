import {Component, OnInit} from '@angular/core';
import { Trader } from '../domain/Trader';
import { TradersService } from '../traders.service';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  constructor(private tradersService: TradersService) {}

  traders: Trader[];

  ngOnInit() {
    this.traders = [];
    this.tradersService.getTraders().then(result => this.traders = result);
  }

  add(name: string)
  {
    this.tradersService.add(name);
  }

  private updateTraders()
  {
    this.tradersService.getTraders().then(result => this.traders = result);
  }

}
