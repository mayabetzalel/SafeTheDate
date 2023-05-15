import Card from "@mui/material/Card"
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material"

const TICKET_HEIGHT = 250

interface TicketCardProps {
  header: string
  subhrader: string
  title: string
  image?: string
  onClick?: () => void
}

const EventCard = ({
  header,
  title,
  image = "https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg",
  subhrader,
  onClick,
}: TicketCardProps) => {
  return (
    <Card onClick={onClick} sx={{ cursor: onClick ? "pointer" : "default" }}>
      <CardHeader
        avatar={
          <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>
            {title.charAt(0)}
          </Avatar>
        }
        title={header}
        subheader={subhrader}
      />
      <CardContent>
        <Typography variant="h5" align={"center"}>
          {title}
        </Typography>
      </CardContent>
      <CardMedia sx={{ height: TICKET_HEIGHT }} image={image} />
    </Card>
  )
}

export default EventCard
