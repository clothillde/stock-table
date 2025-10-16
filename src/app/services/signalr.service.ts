import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { StocksStore } from '../stores/stocks.store';
import { IStock } from '../interfaces/stock.interface';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private _hubConnection!: signalR.HubConnection;

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
        this._registerHandlers();
        this._fetchAllStocks();
      })
      .catch(err => console.error('Error while starting connection:', err));
  }

  private _registerHandlers() {
    this._hubConnection.on('updateStockPrice', (stock: IStock) => {
      this._stocksStore.upsertStock(stock);
    });

    this._hubConnection.onclose(error => {
      console.warn('SignalR connection closed:', error);
    });
  }

  private async _fetchAllStocks() {
    try {
      const stocks = await this._hubConnection.invoke<IStock[]>('getAllStocks');
      this._stocksStore.setAll(stocks || []);
    } catch (err) {
      console.error('Error fetching stocks:', err);
    }
  }
}
