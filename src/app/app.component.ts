import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalRService } from './services/signalr.service';
import { StocksStore } from './stores/stocks.store';
import { ErrorComponent, LoadingComponent, TableComponent } from './components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, LoadingComponent, ErrorComponent, TableComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    stocks = computed(() => this._stocksStore.stocks());
    loading = computed(() => this.stocks().length === 0 && !this._signalRService.error());
    error = computed(() => this._signalRService.error());

    private _stocksStore = inject(StocksStore);
    private _signalRService = inject(SignalRService);

    ngOnInit(): void {
        this._signalRService.startConnection();
    }
}
