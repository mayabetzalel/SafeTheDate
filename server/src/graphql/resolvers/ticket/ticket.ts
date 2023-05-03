import {MutationResolvers, Query, QueryResolvers} from "../../typeDefs";

const ticketResolver: {
    Query: Pick<QueryResolvers, "ticket">;
} = {
    Query: {
        ticket: (parent, args, context, info) => {
            return [{id: "", areaNumber: 3213213,sitNumber: 231, eventName: "rihanna"}];
        }
    }
}

export default ticketResolver
