import { useEffect, useState } from 'react';
import { fetchStockSymbols, StockSymbol } from '../api/stock';
import { Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';

type Props = {
  value: StockSymbol | null;
  onChange: (value: StockSymbol | null) => void;
};

export const StockSymbolSelect = ({ value, onChange }: Props) => {
  const navigate = useNavigate();
  const [stockSymbol, setStockSymbol] = useState<StockSymbol | null>(null);
  const [options, setOptions] = useState<StockSymbol[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStockSymbols();
        setOptions(data);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError('Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        {'株式を選択'}
      </Typography>

      <Box display="flex" gap={2}>
        <Autocomplete
          value={stockSymbol}
          fullWidth
          options={options}
          getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
          loading={loading}
          onChange={(_, value) => setStockSymbol(value)}
          renderInput={(params) => <TextField {...params} label="企業を検索" />}
        />
      </Box>

      <Button
        onClick={() => navigate(PATH.STOCK_DETAIL(stockSymbol?.symbol ?? ''))}
        variant="outlined"
        disabled={stockSymbol === null}
      >
        {'詳細に遷移'}
      </Button>
    </Container>
  );
};
