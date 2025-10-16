import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStock } from '../../interfaces/stock.interface';
import { HighlightChangeDirective } from '../../directives/highlight-change.directive';

@Component({
  selector: 'app-stock-table',
  standalone: true,
  imports: [
    CommonModule,
    HighlightChangeDirective
  ],
  templateUrl: './stock-table.component.html',
})
export class TableComponent {
  @Input() stocks: IStock[] = [];
}
