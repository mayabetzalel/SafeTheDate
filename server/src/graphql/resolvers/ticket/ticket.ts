import { QueryResolvers, MutationResolvers, Ticket } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"
import mongoose, { Types } from 'mongoose';

const DEFAULT_LIMIT = 50
const FAILED_MUTATION_MESSAGE = "mutation createTicket failed"

const ticketResolvers: {
  Query: Pick<QueryResolvers, "isVallid">;
  Mutation: Pick<MutationResolvers, "createTicket">
} = {
  Query: {
    isVallid: async (parent, args, context, info) => {
      const { eventId, barcode } = args;

      return true
    }
  },
  Mutation: {
    createTicket: async (parent, { inputTicket }, context, info) => {
      const { _id, userId, eventId, barcode } = inputTicket;
      try {

        const newTicket = await TicketModel.create({
          _id: new mongoose.Types.ObjectId(),
          userId: new Types.ObjectId(userId),
          eventId: new Types.ObjectId(eventId),
          barcode: barcode
        });
        console.log("Ticket created: " + newTicket);
        return { message: "ticket created succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
  }
}

export default ticketResolvers
