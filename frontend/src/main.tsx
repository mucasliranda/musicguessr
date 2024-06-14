import ReactDOM from 'react-dom/client'
import './globals.css'
import Router from './routes/index.tsx'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Router />
      <ToastContainer
        theme='dark'
        autoClose={3000}
        newestOnTop
      />
    </BrowserRouter>
  </QueryClientProvider>
)
