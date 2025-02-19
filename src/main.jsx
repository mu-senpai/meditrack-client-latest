import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { routes } from './routes/routes';
import './index.css'
import AuthProvider from './providers/AuthProvider';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='w-full min-[1920px]:max-w-[120rem] mx-auto'>
          <RouterProvider router={routes} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
