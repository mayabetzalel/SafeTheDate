import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { createYoga } from "graphql-yoga";
import getSchema from "./graphql/shcema";
import settings from "./config/settings";
import setUpMongo from "../mongo/mongoDbManager";
(async () => {
  const yoga = createYoga({
    schema: await getSchema(),
    plugins: [useCookies()],
  });

  setUpMongo();
  let app;
  if (!process.env.IS_DEVELOPMENT) {
    const https = require("https");
    const fs = require("fs");
    const options = {
      key: fs.readFileSync("../../../../etc/ssl/myserver.key"),
      cert: fs.readFileSync("../../../../etc/ssl/cs.crt"),
    };
    app = https.createServer(options, yoga);
  } else {
    const http = require("http");
    app = http.createServer(yoga);
  }

  app.listen(settings.port);
  console.log(
    `Running a GraphQL API server at http://localhost:${settings.port}/graphql`
  );
})();
