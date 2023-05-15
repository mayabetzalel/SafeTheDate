const express = require("express");
const cors = require("cors");

import { createYoga } from "graphql-yoga"
import getSchema from "./graphql/shcema"
import settings from "./config/settings"
import setUpMongo from "../mongo/mongoDbManager"

(async () => {
  const app = express();

  // Create a Yoga instance with a GraphQL schema.
  const yoga = createYoga({ schema: await getSchema() })

  setUpMongo()

  app.use("/graphql", yoga);

  // Start the server and you're done!
  app.listen(settings.port);
  console.log(
    `Running a GraphQL API server at http://localhost:${settings.port}/graphql`
  );
})();
