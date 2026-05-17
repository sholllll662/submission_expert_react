import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { setAuthToken } from "./api/dicodingForumAPI";

const { token } = store.getState().auth;
if (token) {
  setAuthToken(token);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
