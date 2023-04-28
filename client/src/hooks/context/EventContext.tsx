import { createContext, useContext, useState } from 'react';
import { ChatResponse } from '../../graphql/graphql';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface EventContextType {
    eventFilters: ChatResponse | undefined;
    setEventFilter: (eventFilters: ChatResponse) => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export default function EventProvider({children}: {children: ReactJSXElement[]}) {
    const [eventFilters, setEventFilter] = useState<ChatResponse | undefined>();

    return (
        <EventContext.Provider value={{ eventFilters, setEventFilter }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEventContext() {
    return useContext(EventContext) as EventContextType;
}
