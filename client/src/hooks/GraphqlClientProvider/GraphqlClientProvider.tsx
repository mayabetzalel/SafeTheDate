import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { PropsWithChildren } from "react";

const client = new Client({
  url: process.env.REACT_APP_BACKEND_URL + "/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const GraphqlClientProvider = ({ children }: PropsWithChildren) => (
  <Provider value={client}>{children}</Provider>
);

export default GraphqlClientProvider;
