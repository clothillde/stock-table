import { Injectable, computed } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { IStock } from '../interfaces/stock.interface';

export interface StocksState {
  entities: Record<string, IStock>;
}

const initialState: StocksState = {
  entities: {},
};

@Injectable({
  providedIn: 'root',
})
export class StocksStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const stocks = computed(() => Object.values(store.entities()));

    return {
      setAll(stocks: IStock[]) {
        patchState(store, {
          entities: Object.fromEntries(stocks.map((s) => [s.symbol, s])),
        });
      },

      upsertStock(stock: IStock) {
        patchState(store, (state) => ({
          entities: {
            ...state.entities,
            [stock.symbol]: stock,
          },
        }));
      },

      stocks,
    };
  }),
) {}
