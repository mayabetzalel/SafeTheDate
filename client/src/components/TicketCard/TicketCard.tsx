import Card from "@mui/material/Card";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

// TODO: replace this type after graphql comes in
interface TicketType {
  eventName: string;
  publisherName: string;
  date: Date;
  location: string;
  img: string;
}

interface TicketCardProps {
  ticket?: TicketType;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>
            U
          </Avatar>
        }
        title="Publisher Name"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="h5" align={'center'}>Event Name</Typography>
      </CardContent>
      <CardMedia
        sx={{ height: 200 }}
        image="https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg"
      />
    </Card>
  );
};

export default TicketCard;
