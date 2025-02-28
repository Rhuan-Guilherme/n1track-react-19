import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-cleint";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />;
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
