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
} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Event = () => {
  return (
    <Grid
      container
      columnSpacing={3}
      sx={(theme) => ({ color: theme.palette.primary.main })}
    >
      <Grid item xs>
        <Card sx={{ borderRadius: "40px" }}>
          <CardMedia
            sx={{ height: "100%" }}
            image="https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg"
          />
        </Card>
      </Grid>
      <Grid item xs>
        <Stack spacing={5}>
          <Typography variant={"h3"}>This Is The Event Title</Typography>
          <Stack spacing={2}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Avatar
                sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}
              >
                U
              </Avatar>
              <Typography variant={"subtitle1"}>hello publisher</Typography>
            </Stack>
              {/*<Typography ><LocationOnIcon/>{location}</Typography>*/}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
