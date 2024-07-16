import React from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

interface ChatInputProps {
  onSubmit: (message: string) => void; // Update function signature to accept message string
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Update onChange handler type
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, value, onChange }) => {

  return (
    <Form onSubmit={(event) => {

      onSubmit(event.value.toString())
    }}>
      <Box direction="row" gap="small">
        <FormField>
          <TextInput
            placeholder="Enter your message..."
            value={value}
            onChange={onChange}
            size="medium"
          />
        </FormField>
        <Button
          primary
          type="submit"
          label="Send"

          disabled={!value} // Disable button if no message entered
        />
      </Box>
    </Form>
  );
};

export default ChatInput;
