import {
  Stack,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import Events from "../Events";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";

enum Filters {
  TODAY,
  THIS_WEEK,
  THIS_MONTH,
  SECOND_HAND,
}

export const EventsPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<Filters>();

  const onFilterSelected = (filter: Filters) => {
    setSelectedFilter(filter);
  };

  return (
    <Stack spacing={3}>
      <TextField
        InputProps={{
          sx: (theme) => ({ backgroundColor: theme.palette.background.paper }),
        }}
        value={searchText}
        color={"secondary"}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Stack spacing={1} direction={"row"} alignItems={"center"}>
        <TuneIcon color={"primary"} />
        <ToggleButtonGroup
          size="small"
          value={selectedFilter}
          exclusive
          onChange={(_, value) => onFilterSelected(value)}
        >
          <ToggleButton value={Filters.TODAY}>
            <Typography>Today</Typography>
          </ToggleButton>
          <ToggleButton value={Filters.THIS_WEEK}>
            <Typography>This Week</Typography>
          </ToggleButton>
          <ToggleButton value={Filters.THIS_MONTH}>
            <Typography>This Month</Typography>
          </ToggleButton>
          <ToggleButton value={Filters.SECOND_HAND}>
            <Typography>Second-Hand</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Events filterParams={{ name: searchText }} />
    </Stack>
  );
};
