export default  `
    type ChatResponse {
        response: String!
    }

    input InputMessage {
        message: String!
    }

    type Mutation {
        chatCommand(inputMessage: InputMessage!): [ChatResponse]!
    }
`