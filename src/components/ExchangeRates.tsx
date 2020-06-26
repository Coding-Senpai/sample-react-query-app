import { useState } from "react";
import { useQuery, queryCache } from "react-query";
import React from "react";

const fetchExchangeRates = async (currency: string) => {
  const response = await fetch(
    `https://api.ratesapi.io/api/latest?base=${currency}`
  );

  return response.json();
};

export default function ExchangeRates() {
  const [currency, setCurrency] = useState("EUR");
  const { data, error, isFetching } = useQuery([currency], fetchExchangeRates);

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <button onClick={() => setCurrency("USD")}>USD</button>
        <button onClick={() => setCurrency("EUR")}>EUR</button>
        <button
          onClick={() => queryCache.prefetchQuery(["USD"], fetchExchangeRates)}
        >
          Prefetch USD/PLN rate
        </button>
      </div>
      {isFetching && <div>Loading ....</div>}
      {data && (
        <div>
          {currency}/PLN rate: {data.rates["PLN"]}
        </div>
      )}
      {error && <div>Sorry, there was an error!</div>}
    </>
  );
}
