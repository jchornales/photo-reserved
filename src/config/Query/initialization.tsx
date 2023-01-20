import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BaseLayout } from '../Types/initialize';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});
export default function ClientQuery({ children }: BaseLayout) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
