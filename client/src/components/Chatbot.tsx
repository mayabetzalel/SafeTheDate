import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

interface chatbotProps {
    handleMessageComplete: (message: string) => void; 
}

export function Chatbot(props: chatbotProps) {
    const {handleMessageComplete} = props;

    return (
        <div style={{ position: "relative", height: "500px" }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        <Message
                            model={{ message: "234", direction: "incoming", position: "first" }}
                        />
                        <Message
                            model={{ message: "234", direction: "outgoing", position: "first"}}
                        />
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleMessageComplete}/>
                </ChatContainer>
            </MainContainer>
        </div>
    )
}