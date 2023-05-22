import { graphql } from "graphql";
import { QueryResolvers, MutationResolvers } from "../../typeDefs";
import axios from "axios";
const thirdPartyTicketsResolvers: {
  Query: Pick<QueryResolvers, "validateTicket">;
  Mutation: Pick<MutationResolvers, "generateTicketForCurrentEvent">;
} = {
  Query: {
    validateTicket: async (parent, args, context, info) => {
      try {
        console.log("validateTicket");
        const { data } = await axios({
          url: process.env.THIRD_PARTY_ENDPOINT + context.req.baseUrl,
          method: "post",
          headers: context.request.headers.headersInit,
          data: context.params,
        });

        if (data) {
          return data.data.validateTicket;
        }
        return {};
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
  Mutation: {
    generateTicketForCurrentEvent: async (parent, args, context, info) => {
      try {
        console.log("generateTicketForCurrentEvent");

        const { data } = await axios({
          url: process.env.THIRD_PARTY_ENDPOINT + context.req.baseUrl,
          method: "post",
          headers: context.request.headers.headersInit,
          data: context.params,
        });

        if (data) {
          console.log(
            "Updated document:",
            data.data.generateTicketForCurrentEvent
          );
          return data.data.generateTicketForCurrentEvent;
        } else {
          console.log("Document not found");
        }
        return {};
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
};

export default thirdPartyTicketsResolvers;
