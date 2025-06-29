import { Box } from '@mui/material';
import { StockSymbolSelect } from '../components/StockSelect';
import { useState } from 'react';
import { StockSymbol } from '../api/stock';

export const Home = () => {
  const [stockSymbol, setStockSymbol] = useState<StockSymbol | null>(null);
  return (
    <Box>
      <h1>{'home'}</h1>
      <StockSymbolSelect value={stockSymbol} onChange={setStockSymbol} />
    </Box>
  );
};
