export default `
    type Ticket {
        _id: ID
        userId: ID
        eventId: ID
        barcode: String
    }

    input InputTicket {
        _id: ID!,
        userId: ID!,
        eventId: ID!,
        barcode: String!,
    }

    type Query {
        isVallid(eventId: ID!, barcode: String!): Boolean!
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse!
    }
`
