import { useState } from "react";
import {  Typography } from "@mui/material";
import { Chatbot, chatbotProps } from "./Chatbot";
import { useNavigate } from "react-router";
import { gql, useMutation } from "urql";
import { ChatResponse, InputMessage } from "../graphql/graphql";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { useEventContext } from "../hooks/context/EventContext";
import _ from "lodash";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const [messages, setMessages] = useState<{ messageData: string, direction: MessageDirection }[]>([]);
  const { setEventFilter } = useEventContext();

  function handleClose() {
    navigate("/");
  }

  const [result, getChatResponse] = useMutation<{
    chatCommand: ChatResponse;
  }>(GET_CHATBOT_RESPONSE);

  function handleComplete(message: string): void {
    setMessages(prev => ([...prev, { messageData: message, direction: "outgoing" }]));

    const inputMessage: InputMessage = {
      message
    };

    // Call the createEvent mutation with the inputEvent object
    getChatResponse({ inputMessage }).then((result: any) => {

      if (result.error) {
        console.error("Error generating chat reponse:", result.error);
      } else {
        const { eventName: name, location, from, to, type } = result.data.chatCommand;

        const eventFilters = { name, location, from, to };

        setEventFilter(_.pickBy(eventFilters, _.isString));
        setMessages(prev => ([...prev, {type, messageData: result.data.chatCommand.responseMessage, direction: "incoming" }]));
      }
    });
  }

  return (
    <div>
      <Typography variant="h4" style={{fontFamily: "bold"}}>Captain</Typography>
      <Chatbot handleMessageComplete={handleComplete} messages={messages} />
    </div>

  )
}