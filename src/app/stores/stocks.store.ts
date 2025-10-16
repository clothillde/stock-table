import { Injectable } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { IStock } from '../interfaces/stock.interface';

export interface StocksState {
  entities: Record<string, IStock>;
}

const initialState: StocksState = {
  entities: {}
};

@Injectable({
  providedIn: 'root'
})
export class StocksStore extends signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setAll(stocks: IStock[]) {
      const entities = stocks.reduce<Record<string, IStock>>((acc, stock) => {
        acc[stock.symbol] = stock;
        return acc;
      }, {});
      patchState(store, { entities });
    },

    upsertStock(stock: IStock) {
      patchState(store, (state) => ({
        entities: {
          ...state.entities,
          [stock.symbol]: stock
        }
      }));
    },

    stocks() {
      return Object.values(store.entities());
    }
  }))
) {}
