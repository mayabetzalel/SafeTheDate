import React, { useState } from 'react';
import Card from "@mui/material/Card";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TICKET_HEIGHT = 250;

interface EventCardProps {
  header: string;
  subheader: string;
  title: string;
  image?: string;
  ticketsAmount?: number
  ticketPrice?: number
  onClick?: () => void;
  menuItems?: { label: string; onClick: (id: string) => void }[];
  id: string;
}

const EventCard = ({
  header,
  title,
  ticketsAmount,
  ticketPrice,
  image = "https://thumbs.dreamstime.com/b/nightclub-party-lightshow-18331890.jpg",
  subheader,
  onClick,
  menuItems,
  id,
}: EventCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemOnClick: (id: string) => void) => {
    return () => {
      itemOnClick(id);
      handleMenuClose();
    };
  };

  return (
    <Box padding={1}>
      <Card onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>
              {title.charAt(0)}
            </Avatar>
          }
          title={header}
          subheader={subheader}
          action={
            <>

              <IconButton
                onClick={handleMenuOpen}
                sx={{ ml: "auto", color: "black" }}
              >
                <MoreVertIcon />
              </IconButton>

            </>
          }
        />
        <CardContent>
          <Typography variant="h5" align="center">
            {title}
          </Typography>
          {ticketsAmount && <Typography variant="body1" align={"center"}>
            {ticketsAmount + ' tickets avilable ' + ticketPrice + ' NIS'}
          </Typography>}
        </CardContent>
        <CardMedia sx={{ height: TICKET_HEIGHT }} image={image} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {menuItems?.map((item) => (
            <MenuItem
              key={item.label}
              onClick={handleMenuItemClick(item.onClick)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Card>
    </Box>
  );
};

export default EventCard;
