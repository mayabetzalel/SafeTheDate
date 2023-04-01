import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import getSchema from "./graphql/shcema";
import settings from "./config/settings";

(async () => {
  // Create a Yoga instance with a GraphQL schema.
  const yoga = createYoga({ schema: await getSchema() });

  // Pass it into a server to hook into request handlers.
  const server = createServer(yoga);

  // Start the server and you're done!
  server.listen(settings.port, () => {
    console.info(
      `Server is running on http://localhost:${settings.port}/graphql`
    );
  });
})();
