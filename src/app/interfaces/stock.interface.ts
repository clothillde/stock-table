export interface IStock {
  symbol: string;
  price: number;
  dayMax: number;
  dayMin: number;
  dayOpen: number;
  lastUpdate: string;
  change: number;
  percentChange: number;
}
