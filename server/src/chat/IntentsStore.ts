import { WitIntent } from "../graphql/resolvers/chat/chat"

export default {
    ["get_event" as WitIntent]: {
        responseMessage: "The captain found you some events",
    },
    ["navigate_page" as WitIntent]: {
        responseMessage: "The captain will navigate you to the requested page"
    },
    ["nothing" as WitIntent]: {
        responseMessage: "The captain didn't processed the request properly, please request events queries or page navigation orders."
    },
    ["empty" as WitIntent]: {
        responseMessage: "The captain didn't find the searched events, please try again."
    },
    ["error" as WitIntent]: {
        responseMessage: "Something went wrong, please try again or consult with the support."
    },
    
}