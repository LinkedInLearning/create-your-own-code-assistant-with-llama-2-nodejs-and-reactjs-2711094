import React, { useEffect, useState } from "react";

import { ChatMessageProps } from "../components/ChatMessage";
import { Box } from "grommet";
import ChatConversation from "../components/ChatConversation";
import ChatInput from "../components/ChatInput";
import { vscode } from "../utilities/vscode";
const ConversationView: React.FC = () => {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = useState<ChatMessageProps[]>([{ user: 'You', text: 'Hello!', isSentByMe: true },
  { user: 'OpenLlama', text: 'Hi there!', isSentByMe: false },
  ])

  useEffect(() => {
    window.addEventListener('message', handleExtensionMessage);
    return () => window.removeEventListener('message', handleExtensionMessage);
  }, []);

  // TODO: We need to define this
  const handleExtensionMessage = (event: any) => {
    const { type, data } = event.data;
    if (type === 'serverResponse') {
      // Handle server response data
      console.log('Server response:', data);
      setMessages([...messages, ...data])
      // ... (Update chat UI based on server response)
    }
  };
  const handleSendMessage = () => {
    // Handle sending the message to your backend or OpenLlama service
    console.log('Sending message:', message);
    vscode.postMessage({
      command: "chatMessage",
      text: message,
    });
    setMessage(''); // Clear the input field after sending
  };

  return (
    <Box fill>
      <Box flex grow={1} overflow="auto">
        <ChatConversation messages={messages} />
      </Box>
      <ChatInput value={message} onChange={e => setMessage(e.target.value)} onSubmit={handleSendMessage} />
    </Box>
  );
};


export default ConversationView;
