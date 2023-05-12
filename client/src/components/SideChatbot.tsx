import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import ChatIcon from '@mui/icons-material/Chat';
import Captain from './Captain';

const ChatButtonContainer = styled('div')`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(2)};
  left: ${({ theme }) => theme.spacing(2)};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ChatButtonPrimary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const ChatButtonSecondary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const ChatPopUp = styled('div')`
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 10px;
  bottom: ${({ theme }) => theme.spacing(2)};
  top: 50px; /* Added this line to move the container up by 50 pixels */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SideChatbot = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const muiTheme = useTheme();

    const handleChatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChatClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'chat-popover' : undefined;

    const ChatButtonComponent = ChatButtonPrimary

    return (
        <ChatButtonContainer theme={muiTheme}>
            <ChatButtonComponent
                onClick={handleChatClick}
                variant="contained"
                startIcon={<ChatIcon />}
            >
                Captain
            </ChatButtonComponent>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleChatClose}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
            >
                <ChatPopUp theme={muiTheme}>
                    <div style={{ flex: 1 }}>
                        <Captain />
                    </div>
                </ChatPopUp>
            </Popover>
        </ChatButtonContainer>
    );
};

export default SideChatbot;
