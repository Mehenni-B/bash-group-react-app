import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import RouterConfig from './routes/_RouterConfig';
import { CacheProvider } from '@emotion/react';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { Toast } from './components/toasts/_index';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ['Tajawal'].join(','),
    button: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#1077BC',
    },
    secondary: {
      main: '#DF932D',
      contrastText: '#fff',
    },
    error: {
      main: '#DB161B',
      contrastText: '#fff',
    },
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


function App() {
  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir={'rtl'}>
            <CssBaseline />
            <Toast />
            <RouterProvider router={RouterConfig} />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
