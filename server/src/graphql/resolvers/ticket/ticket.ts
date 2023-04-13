import { MutationResolvers, Query, QueryResolvers } from "../../typeDefs";
import Ticket from "../../../db/models/ticketModel/ticketModel";
import mongoose from "mongoose";
import ticket from "../../typeDefs/ticket/ticket";

export default {
  Query: {
    ticket: async () => {
      const tickets = await Ticket.find({}).then((tickets) => tickets);

      return tickets;
    },
  },
  Mutation: {
    createTicket: () => {
      return Ticket.create({
        eventId: new mongoose.Types.ObjectId(),
        seat: 26,
        ownerName: "idan peduiem",
      })
        .then(() => "created successfully")
        .catch(() => "faild to create ticket");
    },
  },
};
