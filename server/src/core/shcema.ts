import { createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { join } from "path";

const typeDefs = mergeTypeDefs(
  await loadFilesSync(join(__dirname, "./types/*.graphql"))
);

const resolvers = mergeResolvers(
  await loadFilesSync(join(__dirname, "./resolvers/*.ts"))
);

export const schema = createSchema({
  typeDefs,
  resolvers,
});

export default schema;
