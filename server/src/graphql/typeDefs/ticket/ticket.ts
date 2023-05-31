export default `
    type Ticket {
        _id: ID
        ownerId: String
        eventId: String
        isSecondHand: Boolean
        onMarketTime: Float
        price: Float
        barcode: String
    }

    type TicketResponse {
        ticketId: String
        ownerId: String
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
        eventId: String!,
        isSecondHand: Boolean!, 
        price: Float!,
        barcode: String!,
    }

    input FilterTicketParams {
        userId: String
        eventId: String
        barcode: String
    }

    input CreateTicketParams {
        userId: String
        eventId: String
        barcode: String
        isSecondHand: Boolean
    }

    type Query {
        ticket(filterParams: FilterEventParams, skip: Int, limit: Int, ids: [String]): [TicketResponse!]! @auth
    }

    type Query {
        ticketCount(filterParams: FilterEventParams, ids: [String]): Int! @auth
    }

    type Query {
        getAllSecondHandTicketsByEventId(eventId: String!): Int!
    }

    type Mutation {
        updateMarket(ticketId: String!): MutationResponse!
    }

    type Query {
        isVallid(eventId: String!, barcode: String!): Boolean!
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse! @auth
    }

    type Mutation {
        changeSecondHandToFirstHand(createTicketParams: CreateTicketParams) : MutationResponse!
    }
`
