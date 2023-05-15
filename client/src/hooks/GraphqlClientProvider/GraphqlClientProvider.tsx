import { Client, Provider, cacheExchange, fetchExchange } from 'urql'
import {PropsWithChildren} from "react"

const client = new Client({
    url: 'http://localhost:4000/graphql',
    exchanges: [cacheExchange, fetchExchange],
})

const GraphqlClientProvider = ({children}: PropsWithChildren) => (
    <Provider value={client}>
        {children}
    </Provider>
)

export default GraphqlClientProvider
