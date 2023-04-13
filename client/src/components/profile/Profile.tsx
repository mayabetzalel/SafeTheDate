import { useState } from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

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
        <Box sx={(theme) => ({ p: 3, color: theme.palette.secondary.main, height: '100%' })}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrTab(newValue);
  };

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        bgcolor: theme.palette.background.default,
        display: 'flex',
        height: '100%'
      })}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={currTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={(theme) => ({
          borderRight: 1, borderColor: 'divider',
          color: theme.palette.secondary.main,
          height: '100%'
        })}
      >
        <Tab sx={(theme) => ({ p: 3, color: theme.palette.secondary.main })} label="My Tickets" {...a11yProps(0)} />
        <Tab sx={(theme) => ({ p: 3, color: theme.palette.secondary.main })} label="My Events" {...a11yProps(1)} />
        <Tab sx={(theme) => ({ p: 3, color: theme.palette.secondary.main })} label="Account Details" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={currTab} index={0}>
        My Tickets
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        My Events
      </TabPanel>
      <TabPanel value={currTab} index={2}>
        Account Details
      </TabPanel>
    </Box >
  );
}