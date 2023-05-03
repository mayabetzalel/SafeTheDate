import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Card,
  CardActions,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";

export const Event = () => {
  const publisherName = "publisher name";

  return (
    <Grid
      container
      columnSpacing={3}
      sx={(theme) => ({ color: theme.palette.primary.main, height: "100%" })}
    >
      <Grid item xs>
        <Card sx={{ borderRadius: "40px", height: "100%" }}>
          <CardMedia
            sx={{ height: "100%" }}
            image="https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg"
          />
        </Card>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent={"space-between"}
        xs
      >
        <Stack spacing={3}>
          <Typography variant={"h3"}>This Is The Event Title</Typography>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar
                sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}
              >
                {publisherName.charAt(0)}
              </Avatar>
              <Typography variant="h6">{publisherName}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon />
              <Typography variant="h6">location</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EventIcon />
              <Typography variant="h6">date</Typography>
            </Stack>
          </Stack>
          <Divider color={"grey"} variant="middle" />
          <Typography>additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...additional details of the event...</Typography>
        </Stack>
        <Grid>
          <Button size={'large'} fullWidth variant="contained" color="secondary">
            ORDER TICKET
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
