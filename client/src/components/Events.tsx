import Grid from "@mui/material/Grid";
import { useUserContext } from "../controller/userController/userContext";
import TicketCard from "./TicketCard/TicketCard";

const Events = () => {
  const { user } = useUserContext();

  return (
    <Grid container spacing={2}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
        <Grid item sm={4} md={3}>
          <TicketCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default Events;
