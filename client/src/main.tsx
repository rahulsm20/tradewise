import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";

import "./index.css";
import store from "./store/index.ts";
import { Web3Provider } from "./components/WebProvider.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Web3Provider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Web3Provider>
      </ClerkProvider>
    </Provider>
  </ThemeProvider>
);
