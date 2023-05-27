export default `
    type User {
        _id: ID
        username: String
        password: String
        email: String
        firstName: String
        lastName: String
        refreshToken: ID
        isConfirmed: Boolean
        userConfirmation: ID
        creadit: Float
    }    

    type Mutation {
        updateCredit(userId: String!, newCredit: Float!): MutationResponse!
    } 
`
