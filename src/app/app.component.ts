import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from './services/signalr.service';
import { StocksStore } from './stores/stocks.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stocks = computed(() => this._stocksStore.stocks());
  loading = computed(() => this.stocks().length === 0 && !this._signalRService.error());
  error = computed(() => this._signalRService.error());

  constructor(
    private _signalRService: SignalRService,
    private _stocksStore: StocksStore
  ) {}

  ngOnInit(): void {
    this._signalRService.startConnection();
  }
}
