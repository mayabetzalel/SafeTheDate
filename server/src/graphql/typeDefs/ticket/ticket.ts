export default  `
    #Ticket for an event
    type Ticket {
        id: String # id field - the id of the ticket - ! means to non-nullable value
        eventName: String
        areaNumber: Int
        sitNumber: Int
    }

    type Query {
        ticket(id: [String]): [Ticket]!
    }
`
