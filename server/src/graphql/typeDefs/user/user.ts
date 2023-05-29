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
        image: Upload
    }   
    
    type Query {
        user(userId: String!): User!
    } 

    type Mutation {
        updateCredit(userId: String!, newCredit: Float!): MutationResponse!
    } 

    scalar Upload

    type Mutation {
        updateImage(userId: String!, image: Upload!): MutationResponse!
    } 

    type Mutation {
        updateCredit(userId: String!, newCredit: Float!): MutationResponse!
    } 
`
