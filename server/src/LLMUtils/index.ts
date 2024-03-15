import { Ollama as OllamaClient } from 'ollama-node';
// This might be replaced my langchain
const ollamaUrl = process.env.OLLAMA_URL; // Use actual env variable name

if (!ollamaUrl) {
  throw new Error('Missing OLLAMA_URL environment variable');
}

const ollamaClient = new OllamaClient( ollamaUrl );
ollamaClient.setModel('codellama'); 

// Function to format a prompt for Ollama
export function formatPrompt(promptText): string {
  // Add any necessary formatting or transformations here
  // For example, you might strip HTML tags or normalize encoding
  return promptText.replace(/<[^>]+>/g, ''); // Example: Strip HTML tags
}

// Function to format Ollama's response for display
export function formatOllamaResponse(responseText): string {
  // Apply any desired formatting or highlighting
  // For example, you might highlight code blocks or format lists
  return responseText.replace(/`(.+?)`/gms, '<pre>$1</pre>'); // Example: Format code blocks
}

// Method to send a prompt to Ollama and handle the response
export async function sendPrompt(promptText): Promise<any> {
  try {
    const formattedPrompt = formatPrompt(promptText);
    await ollamaClient.streamingGenerate(formattedPrompt, (response) => {
      return response;
    });
  } catch (error) {
    console.error('Error communicating with Ollama:', error);

    
    throw {ok: false, text: error}; // Re-throw for handling in calling code
  }
}