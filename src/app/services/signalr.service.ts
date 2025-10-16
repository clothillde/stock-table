import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { StocksStore } from '../stores/stocks.store';
import { IStock } from '../interfaces/stock.interface';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private _hubConnection!: signalR.HubConnection;
  error = signal<string | null>(null);

  constructor(private _stocksStore: StocksStore) {}

  public startConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/stocks')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this._hubConnection
      .start()
      .then(() => {
        this.error.set(null);
        this._registerHandlers();
        this._fetchAllStocks();
      })
      .catch(err => {
        console.error('Error while starting connection:', err);
        this.error.set('Unable to connect to the server.');
      });
  }

  private _registerHandlers() {
    this._hubConnection.on('updateStockPrice', (stock: IStock) => {
      this._stocksStore.upsertStock(stock);
    });

    this._hubConnection.onclose(error => {
      console.warn('SignalR connection closed:', error);
      this.error.set('Connection was lost');
    });
  }

  private async _fetchAllStocks() {
    try {
      const stocks = await this._hubConnection.invoke<IStock[]>('getAllStocks');
      this._stocksStore.setAll(stocks || []);
    } catch (err) {
      console.error('Error fetching stocks:', err);
      this.error.set('Error fetching stocks from server.');
    }
  }
}
