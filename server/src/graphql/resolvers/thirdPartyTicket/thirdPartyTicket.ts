import { graphql } from "graphql";
import { QueryResolvers, MutationResolvers } from "../../typeDefs";
import axios from "axios";
import { Event as EventModel } from "../../../../mongo/models/Event";
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket";
const thirdPartyTicketsResolvers: {
  Query: Pick<QueryResolvers, "validateTicketAndImport">;
  Mutation: Pick<MutationResolvers, "generateTicketForCurrentEvent">;
} = {
  Query: {
    validateTicketAndImport: async (parent, args, context, info) => {
      try {
        console.log("validateTicketAndImport");
        const { data } = await axios({
          url: process.env.THIRD_PARTY_ENDPOINT + context.req.baseUrl,
          method: "post",
          headers: context.request.headers.headersInit,
          data: context.params,
        });

        if (data) {
          const validateTicketAndImport = data?.data?.validateTicketAndImport;
          if (validateTicketAndImport.ticket.ownerId === context.user.id) {
            await EventModel.findOneAndUpdate(
              {
                _id: validateTicketAndImport.event._id,
              },
              { ...validateTicketAndImport.event },
              { upsert: true, new: true }
            );

            await TicketModel.findOneAndUpdate(
              {
                _id: validateTicketAndImport.ticket._id,
              },
              { ...validateTicketAndImport.ticket, isSecondHand: true },
              { upsert: true, new: true }
            );
            return data.data.validateTicketAndImport;
          }
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
