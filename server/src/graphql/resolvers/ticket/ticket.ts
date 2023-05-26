import { QueryResolvers, MutationResolvers, Ticket, TicketResponse, Event } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"
import mongoose, { Types } from 'mongoose';
import e = require("express");

const DEFAULT_LIMIT = 50
const FAILED_MUTATION_MESSAGE = "mutation createTicket failed"

const ticketResolvers: {
  Query: Pick<QueryResolvers, "ticket" | "ticketCount" | "isVallid" | "getAllSecondHandTicketsByEventId">;
  Mutation: Pick<MutationResolvers, "createTicket" | "updateMarket">;
} = {
  Query: {
    ticket: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids, customerId } = args;

      // Those are filters to query the mongo
      let { name, location, from, to } = filterParams;

      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
        ...(location && { location: { $regex: location, $options: 'i' } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };

      const unprocessedTickets = await TicketModel.find({...filter, ...(customerId && { userId: customerId }) })
        .populate("eventId")
        .skip(skip)
        .limit(limit)
        .exec();

      const eventTickets = unprocessedTickets.filter(ticket => ticket.eventId);

      let tickets = eventTickets.map(({ eventId, _id, onMarketTime }) => ({
        name: (eventId as any).name,
        location: (eventId as any).location,
        timeAndDate: new Date((eventId as any).timeAndDate).getTime(),
        type: (eventId as any).type,
        image: (eventId as any).image,
        ticketId: _id.toString(),
        onMarketTime: new Date(onMarketTime).getTime()
      }));

      return tickets;
    },
    ticketCount: async (parent, args, context, info) => {
      const { filterParams = {}, ids, customerId } = args;

      let { name, location, from, to, } = filterParams;
      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name } }),
        ...(location && { location: { $regex: location } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };

      return await TicketModel.find({...filter, ...(customerId && { userId: customerId }) })
        .count()
        .exec();

    },
    isVallid: async (parent, args, context, info) => {
      const { eventId, barcode } = args;

      return true
    }, 

    getAllSecondHandTicketsByEventId: async (parent, { eventId }) => {
      const tickets = await TicketModel.find({
        isSecondHand: true, 
        eventId: eventId
      }).count()

      return tickets
    }
  },

  Mutation: {
    updateMarket: async (parent, { ticketId }, context, info) => {
      try {
        let ticket = await TicketModel.findOne({ _id: new Types.ObjectId(ticketId) }).populate("eventId").exec();

        let eventDate = (ticket?.eventId as any)?.timeAndDate;
        let onMarket = ticket?.onMarketTime

        if ((eventDate && new Date() > eventDate) || !eventDate) {
          
          let updatetime = await TicketModel.updateOne({ _id: new Types.ObjectId(ticketId) },
          { $set: { onMarketTime: onMarket ? null : new Date().getTime() } }, { upsert: true });
          
          console.log("Ticket market time update: " + JSON.stringify(updatetime))
          return { message: "ticket updated succesfully", code: 200 }
        }
        throw new Error("The event has already happened.")
      } catch (error) {
        console.log("failed with " + error)
        return { message: FAILED_MUTATION_MESSAGE, code: 500 }
      }
    },
    createTicket: async (parent, { inputTicket }, context, info) => {
      const { _id,
        userId,
        eventId,
        isSecondHand,
        price,
        barcode } = inputTicket
      try {

        const newTicket = await TicketModel.create({
          _id: new mongoose.Types.ObjectId(),
          userId: new Types.ObjectId(userId),
          eventId: new Types.ObjectId(eventId),
          isSecondHand: isSecondHand,
          price: price,
          barcode: barcode
        });
        console.log("Ticket created: " + newTicket);
        return { message: "ticket created succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
  },
    
}

export default ticketResolvers
