// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import 'react-toastify/dist/ReactToastify.css';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Ensure TypeScript knows the type of 'root' by explicitly declaring it.
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element not found. Make sure 'index.html' has an element with id 'root'."
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
