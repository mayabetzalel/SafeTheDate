export default  `
    type Ticket {
        _id: ID
        userId: ID
        eventId: ID
        isFirstHand: Boolean
        price: Float
        barcode: String
    }

    input InputTicket {
        _id: ID!,
        userId: ID!,
        eventId: ID!,
        isFirstHand: Boolean!, 
        price: Float!,
        barcode: String!,
    }

    type Mutation {
        createTicket(inputTicket: InputTicket!): MutationResponse!
    }
`
