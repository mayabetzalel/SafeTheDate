import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

export interface chatbotProps {
    handleMessageComplete: (message: string) => void;
    messages: { messageData: string, direction: MessageDirection }[]
}
//"incoming"
export function Chatbot(props: chatbotProps) {
    const { handleMessageComplete, messages } = props;

    return (
        <div style={{ position: "relative", height: "20rem" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messages.map((message, index) =>
                            <Message
                                key={index + message.messageData}
                                model={{ message: message.messageData, direction: message.direction, position: "first" }}
                            />
                        )}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleMessageComplete} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}