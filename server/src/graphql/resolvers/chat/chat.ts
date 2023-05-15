import { InputMessage } from "../../typeDefs"
import EntitiesMaping from "../../../chat/EntitiesMaping"
import IntentsStore from "../../../chat/IntentsStore"
import { log } from "console"
const { Wit } = require("node-wit")
var _ = require("lodash")

// Constants
const ACCESS_TOKEN = "RMO6ITKXK5EE5IBFPO52WDWRDRM75PNZ"

export default {
  Mutation: {
    chatCommand: async (
      parent: any,
      { inputMessage }: { inputMessage: InputMessage } // Specify the type of inputEvent argument
    ) => {
      // Extract values from the inputEvent object
      const { message } = inputMessage
      // Create a new event using the extracted values

      const client = new Wit({ accessToken: process.env.BOT_ACCESS_TOKEN })
      var res = await client.message(message, {})
      if (!res && res.error) {
        console.error("Got error from wit ai")
        return {
          responseMessage: IntentsStore.error.responseMessage,
        }
      } else {
        var intent = matchWitToSearchedRequests(res)

        var entities = matchEntities(res)

        let responseMessage

        if (IntentsStore?.[intent])
          responseMessage = IntentsStore[intent]?.responseMessage
        else responseMessage = IntentsStore?.nothing?.responseMessage

        return {
          type: intent,
          ...Object.assign({}, ...entities),
          responseMessage,
        }
      }
    },
  },
}

export type WitEntity =
  | "wit$datetime:datetime"
  | "wit$location:location"
  | "wit$notable_person:notable_person"
export type WitIntent = "get_event" | "navigate_page" | "nothing" | "error"

interface WitResponse {
  entities: {
    [key: string]: [
      {
        confidence: number
        name: string
      }
    ]
  }
  intents: [
    {
      confidence: number
      name: string
    }
  ]
}

function matchWitToSearchedRequests(responseMessage: WitResponse): WitIntent {
  // Sort by confidence to get the best hypothesis of the intent
  var sortedIntents = responseMessage.intents.sort(
    (intent1, intent2) => intent1.confidence - intent2.confidence
  )

  // Get the best hypothesis
  var intent = sortedIntents[0]

  return intent.name as WitIntent
}

function matchEntities(responseMessage: WitResponse): any {
  // Pick the relevant entities
  var entities = Object.values(responseMessage.entities).map((entity) =>
    Object.entries(EntitiesMaping[entity[0].name]).map(([key, value]) => ({
      [key]: _.get(entity, value),
    }))
  )

  return entities.flat(1)
}
