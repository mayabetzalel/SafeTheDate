import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { createYoga } from "graphql-yoga";
import getSchema from "./graphql/shcema";
import settings from "./config/settings";
import setUpMongo from "../mongo/mongoDbManager";
import {createServer} from "http";

(async () => {
  const yoga = createYoga({
    schema: await getSchema(),
    plugins: [useCookies()],
  });

  setUpMongo();

  const app = createServer(yoga)

  app.listen(settings.port);
  console.log(
    `Running a GraphQL API server at http://localhost:${settings.port}/graphql`
  );
})();
