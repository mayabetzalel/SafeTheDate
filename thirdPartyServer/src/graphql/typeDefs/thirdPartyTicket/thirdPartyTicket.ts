export default `
    #Ticket for an event
    type ThirdPartyTicket {
        id: String # id field - the id of the ticket - ! means to non-nullable value
        qrCodeId: String
        eventName: String
        price: Int
        ownerEmail: String
    }

    #Ticket for an event
    type ThirdPartyEvent {
        id: String
        name: String
        location: String
        timeAndDate: Float
        type: String
        ticketsAmount: Int
        image: Upload
    }

    scalar Upload
    
    #Ticket for an event
    type ReturnedData {
        ticket: ThirdPartyTicket!
        event: ThirdPartyEvent!
    }

    type Query {
        validateTicketAndImport(id: String): ReturnedData!
    }

    type Mutation {
        generateTicketForCurrentEvent(id: String): ThirdPartyTicket!
    }
`;
