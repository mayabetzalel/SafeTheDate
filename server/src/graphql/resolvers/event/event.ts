import { QueryResolvers, MutationResolvers, Event } from "../../typeDefs";
import { Event as EventModel } from "../../../../mongo/models/Event";
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket";
import { readAndConvertToBase64, writeBase64ToFile } from '../../../../mongo/FileHandler';
import { Types } from "mongoose";

const DEFAULT_LIMIT = 50;
const FAILED_MUTATION_MESSAGE = "mutation createEvent failed";

const eventResolvers: {
  Query: Pick<QueryResolvers, "event" | "eventCount">;
  Mutation: Pick<MutationResolvers, "createEvent" | "decreaseTicketAmount">;
} = {
  Query: {
    event: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids, userId } = args;

      // Those are filters to query the mongo
      let { name, location, from, to } = filterParams;

      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name, $options: "i" } }),
        ...(location && { location: { $regex: location, $options: "i" } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };


      let events = await EventModel.find({ ...filter, ...(userId && { ownerId: userId }) })
        .skip(skip)
        .limit(limit)
        .then((events) => {
          return Promise.all(events.map(({
            ownerId,
            name,
            location,
            timeAndDate,
            type,
            image,
            ticketsAmount,
            description,
            ticketPrice,
            _id,
          }) => {
            let eventData =
            {
              ownerId: ownerId.toString(),
              name,
              location,
              timeAndDate: new Date(timeAndDate).getTime(),
              type,
              ticketsAmount,
              description,
              ticketPrice,
              id: _id.toString(),
            }

            if (image === "exists") {
              return readAndConvertToBase64(_id + ".jpg")
                .then((image) => ({
                  ...eventData,
                  image
                }));
            }
            return eventData;
          }));
        });

      // Use the events array here



      return events;
    },
    eventCount: async (parent, args, context, info) => {
      const { filterParams = {}, ids, userId } = args;

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

      return await EventModel.find({ ...filter, ...(userId && { ownerId: userId }) }).count().exec();
    },
  },
  Mutation: {
    createEvent: async (parent, { inputEvent }, context, info) => {
      const {
        name,
        location,
        timeAndDate = 0,
        type,
        ticketsAmount,
        description,
        ticketPrice,
        image,
      } = inputEvent;
      const userId = context.user._id;

      try {
        const event = await EventModel.create({
          name,
          location,
          timeAndDate: new Date(timeAndDate).toString(),
          type,
          ticketsAmount,
          description,
          ticketPrice,
          ownerId: userId,
          ...(image && { image: "exists" }),
        });

        if (image) {
          const eventId = event._id.toString();
          writeBase64ToFile(`${eventId}.jpg`, image);
        }


        console.log(`Event created succesfully | eventName: "${name}"`)
        return { message: "event created succesfully", code: 200 };
      } catch (e) {
        console.error(`failed to create event...`)
        console.error(e)
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
    decreaseTicketAmount: async (parent, { eventId }) => {
      try {
        let event = await EventModel.findOne({ _id: new Types.ObjectId(eventId) });
        let ticketAmount = event?.ticketsAmount

        await EventModel.updateOne(
          { _id: new Types.ObjectId(eventId) },
          { $set: { ticketsAmount: ticketAmount - 1 } }
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

