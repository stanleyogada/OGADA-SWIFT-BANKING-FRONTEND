import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

type TProps = {
  children: React.ReactNode;
};

const TestProviders = ({ children }: TProps) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return (
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export default TestProviders;
