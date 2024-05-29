import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </div>
  );
}

export default App;
