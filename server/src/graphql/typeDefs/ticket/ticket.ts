export default `
    type Ticket {
        _id: ID
        userId: ID
        eventId: ID
        isSecondHand: Boolean
        onMarketTime: Float
        price: Float
        barcode: String
    }

    type TicketResponse {
        ticketId: String
        userId: String
        eventId: String
        barcode: String
        isSecondHand: Boolean
        onMarketTime: Float
        name: String
        location: String
        timeAndDate: Float
        type: String
        image: Upload
    }

    input InputTicket {
        userId: ID!,
        eventId: ID!,
        isSecondHand: Boolean!, 
        price: Float!,
        barcode: String!,
    }

    input FilterTicketParams {
        userId: ID
        eventId: ID
        barcode: String
    }

    type Query {
        ticket(filterParams: FilterEventParams, skip: Int, limit: Int, ids: [String], userId: String): [TicketResponse!]!
    }

    type Query {
        ticketCount(filterParams: FilterEventParams, ids: [String], userId: String): Int!
    }

    type Query {
        getAllSecondHandTicketsByEventId(eventId: String!): Int!
    }

    type Mutation {
        updateMarket(ticketId: String!): MutationResponse!
    }

    type Query {
        isVallid(eventId: String!, barcode: String!): Boolean! @auth
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse! @auth
    }

    type Mutation {
        changeSecondHandToFirstHand(filterTicketParams: FilterTicketParams) : MutationResponse!
    }
`
