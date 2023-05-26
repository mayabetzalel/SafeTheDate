import { useMutation } from "urql";
import { graphql } from "../../graphql";
import { Exact, InputTicket, MutationResponse, Ticket, TicketResponse } from "../../graphql/graphql";
import { useNavigate } from "react-router";
import EventCard from "../EventCard/EventCard";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { DisplayTicket } from "../DisplayTicket";

const CREATE_EVENT_MUTATION = graphql(`
  mutation UpdateMarket($ticketId: String!) {
    updateMarket(ticketId: $ticketId) {
      message
      code
    }
  }
  `);

interface MyTicketCardProps {
    ticket: TicketResponse
    isOnMarket: boolean;
    localUpdateMarketTime: (ticketId: string) => void;
}

export const MyTicket = (props: MyTicketCardProps) => {
    const { isOnMarket, localUpdateMarketTime, ticket } = props;
    const { name, image, ticketId, type, location } = ticket;
    const navigate = useNavigate();
    const [chosenTicket, setChosenTicket] = useState<string>();
    const { enqueueSnackbar } = useSnackbar();
    const [updateMarketStatusResult, updateMarketStatus] = useMutation<
        {
            updateMarket: MutationResponse;
        }>(CREATE_EVENT_MUTATION);

    console.log(updateMarketStatusResult);


    function onMarketChange(ticketId: string) {
        updateMarketStatus({ ticketId }).then((result) => {
            if (result.error) {
                console.error("Error updating ticket:", result.error);
                enqueueSnackbar("An error occurred", { variant: "error" });
            } else {
                localUpdateMarketTime(ticketId);
                enqueueSnackbar(`Ticket is ${!isOnMarket ? "on" : "off"} market`, { variant: "success" });
                console.log("Ticket updated:", result.data?.updateMarket);
            }
        });
    }

    function closeDisplay() {
        setChosenTicket(undefined);
    }

    const menuItems = [
        { label: `Ticket ${!isOnMarket ? "on" : "off"} market`, onClick: onMarketChange },
        {label: "Show ticket details", onClick: setChosenTicket}
    ]

    return (
        <>
            {chosenTicket && <DisplayTicket ticket={ticket} isOpen={!!chosenTicket} toggleIsOpen={closeDisplay} />}
            <EventCard
                title={name!}
                header={type!}
                subheader={location!}
                image={image || undefined}
                id={ticketId!}
                menuItems={menuItems}
            />
        </>
    )
}

