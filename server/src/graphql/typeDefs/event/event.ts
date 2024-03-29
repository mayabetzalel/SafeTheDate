export default  `
    type Event {
        id: String
        name: String
        location: String
        timeAndDate: String
        type: String
    }

    input InputEvent {
        name: String!
        location: String!
        timeAndDate: String!
        type: String!
    }

    type Query {
        event(inputSearchQuery: InputEvent): [Event]!
    }

    type Mutation {
        createEvent(inputEvent: InputEvent!): Event
    }
`
