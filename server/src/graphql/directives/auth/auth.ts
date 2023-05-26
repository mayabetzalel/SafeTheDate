import { GraphQLError, GraphQLSchema } from "graphql";
import { getDirective, mapSchema, MapperKind } from "@graphql-tools/utils";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export const authSchemaTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
      const { NEED_AUTH = false } = process.env;

      if (authDirective && NEED_AUTH) {
        const originalResolver = fieldConfig.resolve;
        fieldConfig.resolve = async (source, args, context, info) => {
          const token = await context.request.cookieStore?.get("access_token");

          if (!!token) {
            // @ts-ignore
            const user = await axios
              .get("http://localhost:5000/api/auth/session", {
                headers: {
                  cookie: `${token.name}=${token.value}`,
                },
              })
              .then(({ data }) => data);
            if (!user._id) {
              console.log("Auth failed: user._id not valid");
              return new GraphQLError(
                `Auth failed! please add token to the request`
              );
            }
            console.log("request accepted");
            context.user = user;
            return originalResolver(source, args, context, info);
          }
          console.log("Auth failed");
          return [];
        };
      }

      return fieldConfig;
    },
  });
