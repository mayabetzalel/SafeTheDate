export default  `
    type Event {
        id: String
        name: String
        location: String
        timeAndDate: String
        type: String
        image: Upload
    }

    scalar Upload

    input InputEvent {
        name: String!
        location: String!
        timeAndDate: String!
        type: String!
        image: Upload
    }

    input FilterEventParams {
        name: String
        location: String
        from: String
        to: String
    }

    type Query {
        event(filterParams: FilterEventParams, substringName: String, skip: Int, limit: Int, ids: [String]): [Event!]!
    }

    type Mutation {
        createEvent(inputEvent: InputEvent!): MutationResponse!
    }
`
