import { useState } from "react";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { Chatbot, chatbotProps } from "./Chatbot";
import { useNavigate } from "react-router";
import { gql, useMutation } from "urql";
import { BootstrapDialog, BootstrapDialogTitle } from "./helpers/SideDialog";
import { ChatResponse, InputMessage } from "../graphql/graphql";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { useEventContext } from "../hooks/context/EventContext";

const GET_CHATBOT_RESPONSE = gql`
  mutation ChatCommand($inputMessage: InputMessage!) {
    chatCommand(inputMessage: $inputMessage) {
      responseMessage
      eventName
      location
      from
      to
      type
    }
  }
`;

export default function Captain() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ messageData: string, direction: MessageDirection }[]>([]);
  const {setEventFilter} = useEventContext();

  function handleClose() {
    navigate("/");
  }

  const [result, getChatResponse] = useMutation<{
    chatCommand: ChatResponse;
  }>(GET_CHATBOT_RESPONSE);

  function handleComplete(message: string): void {
    setMessages(prev => ([...prev, {messageData: message, direction: "outgoing"}]));

    const inputMessage: InputMessage = {
      message
    };

    // Call the createEvent mutation with the inputEvent object
    getChatResponse({ inputMessage }).then((result: any) => {

      if (result.error) {
        console.error("Error generating chat reponse:", result.error);
      } else {
        setEventFilter(result.data);
        setMessages(prev => ([...prev, {messageData: result.data.chatCommand.responseMessage, direction: "incoming"}]));
      }
    });
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={true}
    >
      <BootstrapDialogTitle id="customized-dialog-title"
        onClose={handleClose}
      >
        Captain ticket
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Chatbot handleMessageComplete={handleComplete} messages={messages}/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus
          onClick={handleClose}
        >
          Exit chat
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}