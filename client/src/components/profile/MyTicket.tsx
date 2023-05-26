import { useMutation } from "urql";
import { graphql } from "../../graphql";
import { Exact, MutationResponse, Ticket } from "../../graphql/graphql";
import Events from "../Events"
import MyTickets from "./MyTickets";
import { useNavigate } from "react-router";
import EventCard from "../EventCard/EventCard";
import { useSnackbar } from "notistack";

const CREATE_EVENT_MUTATION = graphql(`
  mutation UpdateMarket($ticketId: String!) {
    updateMarket(ticketId: $ticketId) {
      message
      code
    }
  }
  `);

interface MyTicketCardProps {
    header: string;
    subheader: string;
    title: string;
    image?: string;
    id: string;
    isOnMarket: boolean;
    localUpdateMarketTime: (ticketId: string) => void;
}

export const MyTicket = ({ header, id, subheader, title, image, isOnMarket, localUpdateMarketTime }: MyTicketCardProps) => {
    const navigate = useNavigate();
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
                // navigate("/");
                localUpdateMarketTime(ticketId);
                enqueueSnackbar(`Ticket is ${!isOnMarket ? "on": "off"} market`, { variant: "success" });
                console.log("Ticket updated:", result.data?.updateMarket);
            }
        });
    }

    return <EventCard
        title={title!}
        header={header!}
        subheader={subheader!}
        image={image!}
        id={id!}
        menuItems={[{ label: `Ticket ${!isOnMarket ? "on" : "off"} market`, onClick: onMarketChange }]} 
           />
}

