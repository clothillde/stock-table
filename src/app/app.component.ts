import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from './services/signalr.service';
import { IStock } from './interfaces/stock.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stocks: IStock[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    console.log('AppComponent init');
    this.signalRService.startConnection();

    this.signalRService.stocks$.subscribe(data => {
      console.log('Angular received stocks:', data);
      this.stocks = data;
    });
  }
}
