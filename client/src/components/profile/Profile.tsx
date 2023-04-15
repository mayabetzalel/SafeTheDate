import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Tab, Tabs, Typography } from "@mui/material";
import TicketCard from "../TicketCard/TicketCard";
import { graphql } from "../../graphql";
import { useQuery } from "urql";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={(theme) => ({
          color: theme.palette.secondary.main, height: '100%', overflow: 'auto', padding: '0px'
        })}>
          <Typography>{children}</Typography>
        </Box>
      )
      }
    </div >
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const Profile = () => {
  const [currTab, setCurrTab] = useState(1)
  // const [myEvents, setMyEvents] = useState<any[]>([])
  const [isLoadingMyEvents, setIsLoadingMyEvents] = useState(false)
  // const [myTicketsEvents, setMyTicketsEvents] = useState<any[]>([])
  const [isLoadingmyTicketsEvents, setIsLoadingMyTicketsEvents] = useState(false)

  const ticketQuery = graphql(`
  query ticketQuery {
    ticket {
      id
      areaNumber
    }
  }
`);

  const [{ data: myTicketsEvents, fetching: fetchingTicketsEvents, error: getTicketsErroe }, reexecuteTicketQuery] = useQuery({
    query: ticketQuery,
  });
  console.log(myTicketsEvents)

  const eventsQuery = graphql(`
  query ticketQuery {
    ticket {
      id
      areaNumber
    }
  }
`);

  const [{ data: myEvents, fetching: fetchingEvents, error: getEventsErroe }, reexecuteEventQuery] = useQuery({
    query: eventsQuery,
  });
  console.log(myEvents)


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrTab(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.default,
        display: 'flex',
        height: '100%'
      })}
    >
      <Tabs
        orientation="vertical"
        value={currTab}
        onChange={handleChange}
        sx={(theme) => ({
          borderRight: 1, borderColor: 'divider',
          color: theme.palette.secondary.main,
          height: '100%', minWidth: '13rem'
        })}
      >
        <Tab sx={(theme) => ({ padding: '2rem 0rem', color: theme.palette.secondary.main })} label="My Tickets" {...a11yProps(0)} />
        <Tab sx={(theme) => ({ padding: '2rem 0rem', color: theme.palette.secondary.main })} label="My Events" {...a11yProps(1)} />
        <Tab sx={(theme) => ({ padding: '2rem 0rem', color: theme.palette.secondary.main })} label="Account Details" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={currTab} index={0}>
        {/* get events by user tickets */}
        {fetchingEvents ?
          <CircularProgress />
          :
          <Grid container spacing={3}>
            {/* {myTicketsEvents && myTicketsEvents?.ticket.map((i) => (
              <Grid key={i?.id} item sm={4} md={3}> */}
            {[1, 2, 3, 4, 5, 6, 7,].map((i) => (
              <Grid key={i} item sm={4} md={3}>
                <TicketCard />
              </Grid>
            ))}
          </Grid>}
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        {/* get events by user */}
        {fetchingTicketsEvents ?
          <CircularProgress />
          :
          <Grid container spacing={3}>
            {/* {myTicketsEvents && myTicketsEvents?.ticket.map((i) => (
              <Grid key={i?.id} item sm={4} md={3}> */}
            {[1, 2, 3, 4, 5, 6, 7,].map((i) => (
              <Grid key={i} item sm={4} md={3}>
                <TicketCard />
              </Grid>
            ))}
          </Grid>}
      </TabPanel>
      <TabPanel value={currTab} index={2}>
        Account Details
      </TabPanel>
    </Box >
  );
}