export default `
    #Ticket for an event
    type ThirdPartyTicket {
        id: String # id field - the id of the ticket - ! means to non-nullable value
        qrCodeId: String
        eventName: String
        price: Int
        ownerEmail: String
    }

    type Query {
        validateTicketAndImport(id: String): ThirdPartyTicket! @auth
    }

    type Mutation {
        generateTicketForCurrentEvent(id: String): ThirdPartyTicket!
    }
`;
