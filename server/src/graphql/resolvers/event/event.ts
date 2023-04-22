import {
  QueryResolvers,
  MutationResolvers,
} from "../../typeDefs";
import { Event } from "../../../../mongo/models/Event";

const eventResolvers: {
  Query: Pick<QueryResolvers, "event">;
  Mutation: Pick<MutationResolvers, "createEvent">;
} = {
  Query: {
    event: (parent, args, context, info) => {
      const { substringName, page } = args;

      return [];
    },
  },
  Mutation: {
    createEvent: async (parent, { inputEvent }, context, info) => {
      const { name, location, timeAndDate, type } = inputEvent;

      const newEvent = await Event.create({
        name,
        location,
        timeAndDate,
        type,
      });

      return {
        ...newEvent.toObject(),
        id: newEvent._id,
      };
    },
  },
};

export default eventResolvers;
