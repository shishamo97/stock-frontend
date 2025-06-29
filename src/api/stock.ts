import { BASE_URL, PATH_STOCK_API } from '../constants/api';

export type StockInfoData = {
  symbol: string;
  longName?: string;
  marketCap?: number;
  dividendYield?: number;
  sector?: string;
  previousClose?: number;
};

// 企業情報取得
export const fetchStockInfo = async (symbol: string): Promise<StockInfoData> => {
  const res = await fetch(`${BASE_URL}${PATH_STOCK_API}/${symbol}/info`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};

export type StockHistoryData = {
  Date: string;
  [key: string]: number | string;
};
// 株価履歴取得
export const fetchStockHistories = async (
  symbol: string,
  period = '5d',
  interval = '1d',
  fields: string[] = ['Open', 'High', 'Low', 'Close', 'Volume'],
): Promise<StockHistoryData[]> => {
  const params = new URLSearchParams({
    period,
    interval,
    fields: fields.join(','),
  });
  const res = await fetch(`${BASE_URL}${PATH_STOCK_API}/${symbol}/history?${params}`);
  if (!res.ok) {
    throw new Error('Failed to fetch stock data');
  }
  return await res.json();
};

export type StockSymbol = {
  symbol: string;
  name: string;
};

export const fetchStockSymbols = async (): Promise<StockSymbol[]> => {
  const res = await fetch(`${BASE_URL}${PATH_STOCK_API}/symbols`);
  if (!res.ok) {
    throw new Error('Failed to fetch stock data');
  }
  return await res.json();
};
