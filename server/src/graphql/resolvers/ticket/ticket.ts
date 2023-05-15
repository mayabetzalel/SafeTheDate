import { QueryResolvers, MutationResolvers, Ticket } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"

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
        barcode } = inputTicket
        console.log("here in server")
      try {
        console.log("hererererererere")
        const newTicket = await TicketModel.create({
            _id,
            userId,
            eventId,
            barcode
        })
        return { message: "ticket created succesfully", code: 200 }
      } catch {
        return { message: FAILED_MUTATION_MESSAGE, code: 500 }
      }
    },
  },
}

export default ticketResolvers
