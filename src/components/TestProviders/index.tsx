import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import ModalProvider from "@contexts/Modal/ModalProvider";

type TProps = {
  children: React.ReactNode;
};

const TestProviders = ({ children }: TProps) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return (
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default TestProviders;
