import React, { lazy } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ReactQueryDevtools } from "react-query-devtools";
import { ReactQueryConfigProvider } from "react-query";
const ExchangeRates = lazy(() => import("./components/ExchangeRates"));

const queryConfig = {
  suspense: true,
  refetchOnWindowFocus: false,
  staleTime: 60000,
};

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ReactQueryConfigProvider config={queryConfig}>
            <React.Suspense fallback={<h1> Loading exchange rates...</h1>}>
              <ExchangeRates />
            </React.Suspense>
          </ReactQueryConfigProvider>
        </header>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
