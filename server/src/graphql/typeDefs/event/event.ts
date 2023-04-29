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
        event(substringName: String, skip: Int, limit: Int): [Event!]!
    }

    type Mutation {
        createEvent(inputEvent: InputEvent!): MutationResponse!
    }
`
