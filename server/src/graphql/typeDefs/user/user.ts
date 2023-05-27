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

    type UserResponse {
        image: Upload
    }
    
    type Query {
        user(userId: String!): UserResponse!
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
