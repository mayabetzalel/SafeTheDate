import {
  Client,
  Provider,
  cacheExchange,
  fetchExchange,
  createClient,
} from "urql";
import { PropsWithChildren } from "react";

const client = createClient({
  url: process.env.REACT_APP_BACKEND_URL + "/graphql",
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: "cache-and-network",
  fetchOptions: {
    credentials: 'include'
  }
});

const GraphqlClientProvider = ({ children }: PropsWithChildren) => (
  <Provider value={client}>{children}</Provider>
);

export default GraphqlClientProvider;
