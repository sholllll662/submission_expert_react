import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./app/store";
import App from "./App";

test("renders navbar brand", () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </Provider>,
  );
  const brand = screen.getByText(/YukDisk Forum/i);
  expect(brand).toBeInTheDocument();
});
