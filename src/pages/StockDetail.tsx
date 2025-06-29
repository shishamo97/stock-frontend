import { useParams } from 'react-router-dom';
import { StockInfo } from '../components/StockInfo';
import { StockHistoryChart } from '../components/StockHistoryChart';

type StockDetailParams = {
  symbol: string;
};

export const StockDetail = () => {
  const { symbol } = useParams<StockDetailParams>();

  if (!symbol) return <p>銘柄が指定されていません</p>;
  return (
    <>
      <StockInfo symbol={symbol} />
      <StockHistoryChart symbol={symbol} period="10d" interval="1d" />
    </>
  );
};
