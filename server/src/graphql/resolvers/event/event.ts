import { QueryResolvers, MutationResolvers, Event } from "../../typeDefs";
import { Event as EventModel } from "../../../../mongo/models/Event";
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket";
import { Types } from "mongoose";

const DEFAULT_LIMIT = 50;
const FAILED_MUTATION_MESSAGE = "mutation createEvent failed";

const eventResolvers: {
  Query: Pick<QueryResolvers, "getEventById" | "event" | "eventCount">;
  Mutation: Pick<MutationResolvers, "createEvent" | "decreaseTicketAmount">;
} = {
  Query: {
    getEventById: async (ids) => {
      let filter = { ...(ids && { _id: { $in: ids } }) }
      return await EventModel.find(filter)
    },

    event: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids, customerId } = args;

      // Those are filters to query the mongo
      let { name, location, from, to } = filterParams;

      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
        ...(location && { location: { $regex: location, $options: 'i' } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from)}),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };

      // need to add user that created
      let events = await EventModel.find({...filter, ...(customerId && { userId: customerId })})
        .skip(skip)
        .limit(limit)
        .then((events) =>
          events.map<Event>(({ name, location, timeAndDate, type, ticketsAmount, image, _id }) => ({
            name,
            location,
            timeAndDate: new Date(timeAndDate).getTime(),
            type,
            ticketsAmount,
            image,
            id: _id.toString(),
          }))
        );

      return events;
    },
    eventCount: async (parent, args, context, info) => {
      const { filterParams = {}, ids, customerId } = args;

      let { name, location, from, to } = filterParams;
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

      return await EventModel.find({...filter, ...(customerId && { userId: customerId })})
        .count()
        .exec();
    },
  },
  Mutation: {
    createEvent: async (parent, { inputEvent }, context, info) => {
      const { name, location, timeAndDate = 0, type, ticketsAmount, image } = inputEvent;

      try {
        const newEvent = await EventModel.create({
          name,
          location,
          timeAndDate: new Date(timeAndDate).toString(),
          type,
          ticketsAmount,
          image
        });
        return { message: "event created succesfully", code: 200 };
      } catch {
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
    decreaseTicketAmount: async (parent, { eventId }) => {
      try {
        let event = await EventModel.findOne({ _id: new Types.ObjectId(eventId) });
        let ticketAmount = event?.ticketsAmount

        await EventModel.updateOne(
          { _id: new Types.ObjectId(eventId) },
          { $set: { ticketsAmount: ticketAmount - 1} }
        );
        return { message: "tickets amount updated succesfully", code: 200 }

      } catch (error) {
          console.log("failed with " + error)
          return { message: FAILED_MUTATION_MESSAGE, code: 500 }
      }
  }
  },
};

export default eventResolvers;
