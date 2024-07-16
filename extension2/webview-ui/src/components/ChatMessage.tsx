import { Avatar, Box, Text } from "grommet";

export interface ChatMessageProps {
  user: string;
  text: string;
  isSentByMe: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user, text, isSentByMe }) => {
  const align = isSentByMe ? 'flex-end' : 'flex-start';
  return (
    <Box direction="row" align={align} gap="small">
      {isSentByMe && <Avatar size="small" src="https://placeimg.com/32/32/people" />}
      <Box>
        <Text>{user}:</Text>
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};

export default ChatMessage;
