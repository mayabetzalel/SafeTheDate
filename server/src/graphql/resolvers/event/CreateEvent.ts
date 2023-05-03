import { Query, InputEvent } from "../../typeDefs";
import { Event } from "../../../../mongo/models/Event";
import { GraphQLResolveInfo } from "graphql";

export default {
    Mutation: {
        createEvent: async (parent: any,
            { inputEvent }: { inputEvent: InputEvent }, // Specify the type of inputEvent argument
            context: any,
            info: GraphQLResolveInfo) => {
            // Extract values from the inputEvent object
            const { name, location, timeAndDate, type } = inputEvent;
            // Create a new event using the extracted values
            const newEvent = await Event.create({
                name,
                location,
                timeAndDate,
                type
            });

            return {
                ...newEvent.toObject(),
                id: newEvent._id
            };
        }
    }
}
