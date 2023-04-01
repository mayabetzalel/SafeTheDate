import {Query} from "../../typeDefs";

export default {
    Query: {
        ticket: (): Query['ticket'] => {
            return [{id: "", areaNumber: 3213213,sitNumber: 231, eventName: "rihanna"}];
        }
    }
}
