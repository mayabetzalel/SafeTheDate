export default  `
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
        _id: ID!,
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
        ticket(filterParams: FilterEventParams, skip: Int, limit: Int, ids: [String], customerId: String): [TicketResponse!]!
    }

    type Query {
        ticketCount(filterParams: FilterEventParams, ids: [String], customerId: String): Int!
    }

    type Mutation {
        updateMarket(ticketId: String!): MutationResponse!
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse!
    }
`
