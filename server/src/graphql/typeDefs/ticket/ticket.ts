export default  `
    type Ticket {
        _id: String 
        eventId: String
        ownerName: String
        seat: Int
    }

    type Query {
        ticket(id: [String]): [Ticket]!
    }
    
    type Mutation {
        createTicket: String!
    }
`
