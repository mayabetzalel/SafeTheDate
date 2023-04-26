const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

import { createYoga } from "graphql-yoga";
import getSchema from "./graphql/shcema";
import settings from "./config/settings";
import setUpMongo from "../mongo/mongoDbManager";

(async () => {

  const app = express();

  // Create a Yoga instance with a GraphQL schema.
  const yoga = createYoga({ schema: await getSchema() });

  setUpMongo();

  app.use(cookieParser());
  
  app.use(cors({
    origin: [process.env.FRONTEND_ENDPOINT!, process.env.BACKEND_ENDPOINT!, "http://localhost:3000"],
    methods: "DELETE, PUT, POST, GET, OPTIONS",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Set-Cookie",
      "X-Requested-With",
    ],
    credentials: true,
  }));

  app.use('/graphql', yoga);

  // Start the server and you're done!
  app.listen(settings.port);
  console.log(`Running a GraphQL API server at http://localhost:${settings.port}/graphql`);
})();
