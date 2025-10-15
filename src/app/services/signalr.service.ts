import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { IStock } from '../interfaces/stock.interface';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private stocksSource = new BehaviorSubject<IStock[]>([]);
  stocks$ = this.stocksSource.asObservable();

  startConnection() {
    console.log('Starting SignalR connection...');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/stocks')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
        this.registerHandlers();

        this.fetchAllStocks();
      })
      .catch(err => console.error('Error while starting connection: ', err));
  }

  private registerHandlers() {
    this.hubConnection.on('updateStockPrice', (stock: IStock) => {
      console.log('Stock update from hub:', stock);

      const current = this.stocksSource.value;
      const updated = current.filter(s => s.symbol !== stock.symbol).concat(stock);

      this.stocksSource.next(updated);
    });

    this.hubConnection.onclose(error => {
      console.warn('SignalR connection closed:', error);
    });
  }

  private async fetchAllStocks() {
    console.log('Fetching all stocks...');
    try {
      const stocks = await this.hubConnection.invoke<IStock[]>('getAllStocks');
      console.log('Initial stocks from backend:', stocks);
      this.stocksSource.next(stocks || []);
    } catch (err) {
      console.error('Error fetching stocks:', err);
    }
  }
}
