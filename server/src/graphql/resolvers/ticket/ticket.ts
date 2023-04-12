import {Query} from "../../typeDefs";
import Ticket from "../../../db/models/ticketModel/ticketModel";
import mongoose from "mongoose";

export default {
  Query: {
    ticket: (): Query["ticket"] => {
      return [
        { id: "", areaNumber: 3213213, sitNumber: 231, eventName: "rihanna" },
      ];
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
