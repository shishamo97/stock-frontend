import { useEffect, useState } from 'react';
import { fetchStockInfo, StockInfoData } from '../api/stock';
import { Paper, Typography, Stack } from '@mui/material';

type Props = {
  symbol: string;
};

export const StockInfo = ({ symbol }: Props) => {
  const [info, setInfo] = useState<StockInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const info = await fetchStockInfo(symbol);
        setInfo(info);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [symbol]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;
  if (!info) return <p>データがありません</p>;

  const currencyUnit = '$';

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>
        {info.longName ?? info.symbol}
      </Typography>
      <Stack spacing={1}>
        <Typography variant="body1">
          <strong>セクター:</strong> {info.sector ?? '情報なし'}
        </Typography>
        <Typography variant="body1">
          <strong>時価総額:</strong>{' '}
          {info.marketCap !== undefined && info.marketCap !== null
            ? currencyUnit + info.marketCap.toLocaleString()
            : '情報なし'}
        </Typography>
        <Typography variant="body1">
          <strong>配当利回り:</strong>{' '}
          {info.dividendYield !== undefined && info.dividendYield !== null
            ? (info.dividendYield * 100).toFixed(2) + '%'
            : '情報なし'}
        </Typography>
        <Typography variant="body1">
          <strong>前日終値:</strong>{' '}
          {info.previousClose !== undefined && info.previousClose !== null
            ? currencyUnit + info.previousClose.toFixed(2)
            : '情報なし'}
        </Typography>
      </Stack>
    </Paper>
  );
};
