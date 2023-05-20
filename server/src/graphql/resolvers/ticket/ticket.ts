import { QueryResolvers, MutationResolvers, Ticket } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"
import mongoose, { Types } from 'mongoose';

const DEFAULT_LIMIT = 50
const FAILED_MUTATION_MESSAGE = "mutation createTicket failed"

const ticketResolvers: {
  Mutation: Pick<MutationResolvers, "createTicket">
} = {
  Mutation: {
    createTicket: async (parent, { inputTicket }, context, info) => {
      const {  _id,
        userId,
        eventId,
        isSecondHand, 
        price,
        barcode } = inputTicket
      try {

        const newTicket = await TicketModel.create({ 
          _id: new mongoose.Types.ObjectId(),
          userId: new Types.ObjectId(userId),
          eventId:new Types.ObjectId(eventId),
          isSecondHand: isSecondHand, 
          price: price,
          barcode: barcode
        })
        console.log("Ticket created: " + newTicket)
        return { message: "ticket created succesfully", code: 200 }
      } catch(error) {
        console.log("failed with " + error)
        return { message: FAILED_MUTATION_MESSAGE, code: 500 }
      }
    },
  },
}

export default ticketResolvers
