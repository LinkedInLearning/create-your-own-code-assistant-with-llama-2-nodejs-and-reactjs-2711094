import { Box, List, Text, Tip } from "grommet";
import ChatMessage from "./ChatMessage";

interface ChatMessage {
  user: string;
  text: string;
  isSentByMe: boolean;
}

const ChatConversation: React.FC<{ messages: ChatMessage[] }> = ({ messages }) => {
  return (
    <List data={messages}>{(item) => (
      <ChatMessage {...item}/>
    )}</List>
  );
}

export default ChatConversation;
