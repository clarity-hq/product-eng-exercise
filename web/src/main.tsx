import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FeedbackFilterProvider } from './lib/FeedbackFilterContext.tsx';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FeedbackFilterProvider>
        <App />
      </FeedbackFilterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
