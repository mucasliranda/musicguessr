import ReactDOM from 'react-dom/client'
import './globals.css'
import Router from './routes/index.tsx'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './shared/components/Toast/toaster.tsx';



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
)
