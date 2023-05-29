import { QueryResolvers, MutationResolvers, Ticket, TicketResponse, Event } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"
import { User as UserModel } from "../../../../mongo/models/User"
import mongoose, { Types } from 'mongoose';
import e = require("express");

const DEFAULT_LIMIT = 50
const FAILED_MUTATION_MESSAGE = "mutation createTicket failed"
const SECOND_HAND_SELL_TICKET_COMMISION = 2

const ticketResolvers: {
  Query: Pick<QueryResolvers, "ticket" | "ticketCount" | "isVallid" | "getAllSecondHandTicketsByEventId">;
  Mutation: Pick<MutationResolvers, "createTicket" | "updateMarket" | "changeSecondHandToFirstHand">;
} = {
  Query: {
    isVallid: async (parent, args, context, info) => {
      const { eventId, barcode } = args;

      const ticket = await TicketModel.findOne({ eventId: eventId, barcode: barcode })

      return !!ticket
    },
    ticket: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids } = args;

      const userId = context.user._id;
      console.log(userId);
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

      const unprocessedTickets = await TicketModel.find({...filter, ...(userId && { ownerId: userId }) })
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
      const { filterParams = {}, ids } = args;

      const userId = context.user._id;
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

      return await TicketModel.find({...filter, ...(userId && { ownerId: userId }) })
        .count()
        .exec();

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

    changeSecondHandToFirstHand: async (parent, { filterTicketParams }, context, info) => {
      const { barcode, eventId } = filterTicketParams
      try {
        let oldTicket = await TicketModel.find({
          eventId: eventId,
          isSecondHand: true
        }).sort({ "_id": 1, "onMarketTime": 1 }).limit(1)

        const creditToAdd = +oldTicket[0]["price"] - SECOND_HAND_SELL_TICKET_COMMISION

        // Add to old ticket's user credit - ticket price  minus 2 shekels.
        const updatedUserCredit = await UserModel.findOneAndUpdate(
          { _id: oldTicket[0].ownerId },
          { $inc: { credit: creditToAdd } }
        )

        // TODO: Add email massage to user that it's ticket was sold.
        await TicketModel.deleteOne({
          _id: oldTicket[0]._id
        })

        console.log("second hand ticket updated to first hand");
        return { message: "second hand ticket updated succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },

    createTicket: async (parent, { inputTicket }, context, info) => {
      const {
        eventId,
        isSecondHand,
        price,
        barcode } = inputTicket

      try {

        const userId = context.user._id;
        console.log(userId)
        const newTicket = await TicketModel.create({
          _id: new mongoose.Types.ObjectId(),
          ownerId: new Types.ObjectId(userId),
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
