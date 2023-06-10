import { QueryResolvers, MutationResolvers } from "../../typeDefs";
import axios from "axios";
import { Event as EventModel } from "../../../../mongo/models/Event";
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket";
import { Types } from "mongoose";
const thirdPartyTicketsResolvers: {
  Query: Pick<QueryResolvers, "validateTicketAndImport">;
  Mutation: Pick<MutationResolvers, "generateTicketForCurrentEvent">;
} = {
  Query: {
    validateTicketAndImport: async (parent, args, context, info) => {
      try {
        console.log("validateTicketAndImport");
        const { data } = await axios({
          url: process.env.THIRD_PARTY_ENDPOINT + context.req.url,
          method: "post",
          headers: context.request.headers.headersInit,
          data: context.params,
        });

        const validateTicketAndImport = data?.data?.validateTicketAndImport;
        if (
          validateTicketAndImport.ticket.id &&
          validateTicketAndImport.event.id
        ) {
          console.log(validateTicketAndImport.ticket.ownerId);
          if (validateTicketAndImport.ticket.ownerId === context.user._id) {
            await EventModel.findOneAndUpdate(
              {
                _id: new Types.ObjectId(validateTicketAndImport.event.id),
              },
              {
                ...validateTicketAndImport.event,
                ...validateTicketAndImport.ticket,
                isExternal: true,
              },
              { upsert: true, new: true }
            );

            await TicketModel.findOneAndUpdate(
              {
                _id: new Types.ObjectId(validateTicketAndImport.ticket.id),
              },
              {
                ...validateTicketAndImport.ticket,
                isSecondHand: true,
              },
              { upsert: true, new: true }
            );
            return data.data.validateTicketAndImport;
          }
        }
        return { ticket: {}, event: {} };
      } catch (error) {
        console.log(error);
        return { ticket: {}, event: {} };
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
