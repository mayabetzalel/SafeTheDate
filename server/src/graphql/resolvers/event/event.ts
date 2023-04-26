import { QueryResolvers, MutationResolvers, Event } from "../../typeDefs";
import { Event as EventModel } from "../../../../mongo/models/Event";

const PAGE_SIZE = 10;

const eventResolvers: {
  Query: Pick<QueryResolvers, "event">;
  Mutation: Pick<MutationResolvers, "createEvent">;
} = {
  Query: {
    event: async (parent, args, context, info) => {
      const { substringName, page } = args;
      const filter = substringName ? { name: `/${substringName}/` } : {};

      const events = await EventModel.find(filter)
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE)
        .then((events) =>
          events.map<Event>(({ name, location, timeAndDate, type, _id }) => ({
            name,
            location,
            timeAndDate: timeAndDate.toString(),
            type,
            id: _id.toString(),
          }))
        );

      return events;
    },
  },
  Mutation: {
    createEvent: async (parent, { inputEvent }, context, info) => {
      const { name, location, timeAndDate, type } = inputEvent;

      const newEvent = await EventModel.create({
        name,
        location,
        timeAndDate,
        type,
      });

      return {};

      // return {
      //   ...newEvent.toObject(),
      //   id: newEvent._id,
      // };
    },
  },
};

export default eventResolvers;
