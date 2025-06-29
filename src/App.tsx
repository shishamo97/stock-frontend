import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { PATH } from './constants/path';
import { Home } from './pages/Home';
import { StockDetail } from './pages/StockDetail';
import { useMemo, useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to={PATH.HOME}>{'Home'}</Link>
        <Link to={PATH.STOCK_DETAIL('AAPL')}>{'AAPL'}</Link>
      </nav>
      <Routes>
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.STOCK_DETAIL(':symbol')} element={<StockDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
