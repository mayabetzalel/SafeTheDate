export default `
    type Ticket {
        _id: ID
        userId: ID
        eventId: ID
        isSecondHand: Boolean
        price: Float
        barcode: String
    }

    input InputTicket {
        _id: ID!,
        userId: ID!,
        eventId: ID!,
        isSecondHand: Boolean!, 
        price: Float!,
        barcode: String!,
    }

    type Query {
        isVallid(eventId: ID!, barcode: String!): Boolean!
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse!
    }
`
