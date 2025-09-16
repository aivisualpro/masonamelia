// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
  // add your custom typography, breakpoints, etc. here
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ data 1 hour tak "fresh" rahega; cache me kam se kam 1 hour tak store rahe
      staleTime: 60 * 60 * 1000, // 1 hour
      gcTime:   60 * 60 * 1000, // 1 hour
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);
