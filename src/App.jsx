import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "../components/AppLayout";
import { DetailsProvider } from "../components/DetailsProvider";
import styles from "./App.module.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data is fresh for 1 minute
      cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
      retry: 2, // Retry failed requests 2 times
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DetailsProvider>
        <div className={styles.container}>
          <AppLayout />
        </div>
      </DetailsProvider>
    </QueryClientProvider>
  );
}

export default App;
