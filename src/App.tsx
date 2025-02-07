import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MarketListPage from "./pages/MarketList";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MarketListPage />
    </QueryClientProvider>
  );
};

export default App;
