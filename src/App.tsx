import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthRouter } from "./routes/routes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthRouter />
    </QueryClientProvider>
  );
}

export default App;
