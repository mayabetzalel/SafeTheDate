import { GraphQLSchema } from "graphql";
import { getDirective, mapSchema, MapperKind } from "@graphql-tools/utils";

export const authSchemaTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];

      if (authDirective) {
        const originalResolver = fieldConfig.resolve;
        fieldConfig.resolve = (source, args, context, info) => {
          console.log(context.request.cookieStore?.get("access_token"));
          console.log(context.request.headers);
          console.log(context.request.headers.cookie);
          return originalResolver(source, args, context, info);
        };
      }

      return fieldConfig;
    },
  });
