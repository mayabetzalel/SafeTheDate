import { QueryResolvers, MutationResolvers, Event } from "../../typeDefs";
import { Event as EventModel } from "../../../../mongo/models/Event";

const DEFAULT_LIMIT = 50;
const FAILED_MUTATION_MESSAGE = "mutation createEvent failed";

const eventResolvers: {
  Query: Pick<QueryResolvers, "event">;
  Mutation: Pick<MutationResolvers, "createEvent">;
} = {
  Query: {
    event: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids } = args;

      let { name, location, from, to } = filterParams;
      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name, $options : 'i' } }),
        ...(location && { location: { $regex: location, $options : 'i' } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from), $options : 'i' }),
            ...(to && { $lt: new Date(to), $options : 'i' }),
          },
        }),
      };

      const events = await EventModel.find(filter)
        .skip(skip)
        .limit(limit)
        .then((events) =>
          events.map<Event>(({ name, location, timeAndDate, type, image, _id }) => ({
            name,
            location,
            timeAndDate: timeAndDate.toString(),
            type,
            image,
            id: _id.toString(),
          }))
        );
      
      return events;
    },
  },
  Mutation: {
    createEvent: async (parent, { inputEvent }, context, info) => {
      const { name, location, timeAndDate, type, image } = inputEvent;

      try {
        const newEvent = await EventModel.create({
          name,
          location,
          timeAndDate,
          type,
          image
        });
        return { message: "event created succesfully", code: 200 };
      } catch {
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
  },
};

export default eventResolvers;
