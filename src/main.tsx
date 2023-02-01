import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import ClientQuery from './config/Query/initialization';
import AppRouter from './config/Routes/routes';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClientQuery>
        <App>
          <AppRouter />
        </App>
      </ClientQuery>
    </MantineProvider>
  </React.StrictMode>
);
