import { GraphQLError, GraphQLSchema } from "graphql";
import { getDirective, mapSchema, MapperKind } from "@graphql-tools/utils";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

type x = ReturnType<any>

export const authSchemaTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
      const { NEED_AUTH = false } = process.env;

      if (authDirective && NEED_AUTH) {
        const originalResolver = fieldConfig.resolve;
        const fieldType = fieldConfig.type;
        fieldConfig.resolve = async (source, args, context, info) => {
          const token = await context.request.cookieStore?.get("access_token");

          if (!!token) {

            try {
              // @ts-ignore
              const user = await axios
                  .get("http://localhost:5000/api/auth/session", {
                    headers: {
                      cookie: `${token.name}=${token.value}`,
                    },
                  })
                  .then(({data}) => data);
              if (!user._id) {
                console.log("Auth failed: user._id not valid");
                return new GraphQLError(
                    `Auth failed! please add token to the request`
                );
              }
              context.user = user;
              return originalResolver(source, args, context, info);
            } catch (e) {
              console.log("Auth failed1");
              return new GraphQLError(
                  `Auth failed! please add token to the request`
              );
            }
          }
          console.log("Auth failed2");
          return new GraphQLError(
              `Auth failed! please add token to the request`
          );
        };
      }

      return fieldConfig;
    },
  });
