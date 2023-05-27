export default `
    type Event {
        id: String
        name: String
        location: String
        timeAndDate: Float
        type: String
        ticketsAmount: Int
        description: String
        image: Upload
    }

    scalar Upload

    input InputEvent {
        name: String!
        location: String!
        timeAndDate: Float!
        type: String!
        ticketsAmount: Int!
        description: String
        image: Upload
    }

    input FilterEventParams {
        name: String
        location: String
        from: Float
        to: Float
    }

    type Query {
        getEventById(ids: [String]): [Event!]!
    }

    type Query {
        event(filterParams: FilterEventParams, skip: Int, limit: Int, ids: [String], userId: String): [Event!]!
    }

    type Query {
        eventCount(filterParams: FilterEventParams, ids: [String], userId: String): Int!
    }

    type Mutation {
        createEvent(inputEvent: InputEvent!): MutationResponse!
    }

    type Mutation {
        decreaseTicketAmount(eventId: String!): MutationResponse!
    } 
`
