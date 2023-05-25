import Card from "@mui/material/Card"
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material"

const TICKET_HEIGHT = 250

interface TicketCardProps {
  header: string;
  subheader: string;
  title: string;
  image?: string;
  ticketsAmount: number
  onClick?: () => void;
}

const EventCard = ({
  header,
  title,
  ticketsAmount,
  image = "https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg",
  subheader,
  onClick,
}: TicketCardProps) => {
  return (
    <Box padding={1}>
      <Card onClick={onClick} sx={{ cursor: onClick ? "pointer" : "default" }}>
        <CardHeader
          avatar={
            <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>
              {title.charAt(0)}
            </Avatar>
          }
          title={header}
          subheader={subheader}
        />
        <CardContent>
          <Typography variant="h5" align={"center"}>
            {title}
          </Typography>
          {ticketsAmount && <Typography variant="body1" align={"center"}>
            {ticketsAmount + ' tickets avilable'}
          </Typography>}
        </CardContent>
        <CardMedia sx={{ height: TICKET_HEIGHT }} image={image} />
      </Card>
    </Box>
  );
};

export default EventCard
