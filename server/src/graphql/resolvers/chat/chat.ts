import { Mutation, InputMessage } from "../../typeDefs";
import { GraphQLResolveInfo } from "graphql";
const {Wit, log} = require('node-wit');

export default {
    Mutation: {
        chatCommand: async (parent: any,
            { inputMessage }: { inputMessage: InputMessage }, // Specify the type of inputEvent argument
            context: any,
            info: GraphQLResolveInfo) => {
            // Extract values from the inputEvent object
            const { message } = inputMessage;
            // Create a new event using the extracted values

            const client = new Wit({ accessToken: 'RMO6ITKXK5EE5IBFPO52WDWRDRM75PNZ' });
            await client
                .message(message, {})
                .then((data: any) => {
                    console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
                })
                .catch(console.error);

            return {
                message: "chat response"
            };
        }
    }

}