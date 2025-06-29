import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchStockHistories, StockHistoryData } from '../api/stock';
import { Box, Typography } from '@mui/material';

type Props = {
  /** 銘柄のシンボル（例: "AAPL"） */
  symbol: string;
  /** データ取得期間（例: "10d", "1mo", "6mo"） */
  period: string;
  /** データの間隔（例: "1d", "1h", "5m"） */
  interval: string;
};

export const StockHistoryChart = ({ symbol, period, interval }: Props) => {
  const [histories, setHistories] = useState<StockHistoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const histories = await fetchStockHistories(symbol, period, interval, [
          'Open',
          'High',
          'Low',
          'Close',
        ]);
        setHistories(histories);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [symbol, period, interval]);

  console.log(histories);

  if (loading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">エラー: {error}</Typography>;
  if (!histories || histories.length === 0) return <Typography>データがありません</Typography>;

  return (
    <Box sx={{ width: '100%', height: 300, my: 4 }}>
      <Typography variant="h6" gutterBottom>
        株価推移（{symbol}）
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={histories}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Close" stroke="#3f51b5" name="終値" />
          <Line type="monotone" dataKey="Open" stroke="#6f5ff5" name="始値" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
