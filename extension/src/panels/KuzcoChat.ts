import { ChatRequest, ChatContext, ChatResult, ChatResponseStream, CancellationToken, Disposable, Uri } from 'vscode';
import fetch from 'node-fetch'; 


import { API_URLS, HEADERS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utilities/constants';

const KuzcoChat = {
  _disposables: [] as Disposable[],

  async initialize(
    request: ChatRequest,
    context: ChatContext,
    stream: ChatResponseStream,
    token: CancellationToken
  ): Promise<ChatResult> {
    if (request.command === 'ingest') {
      stream.progress('Ingesting your repo give me a minute...');
      // Add logic here to handle the teaching scenario
      this.ingestCall(request.prompt);
    } else {
      // Determine the user's intent
      const intent = this.determineUserIntent(request.prompt);
      // Add logic here to handle other scenarios
    }

    return { metadata: { command: 'ingest' } };
  },

  async ingestCall(prompt: string) {
    try {
      const response = await fetch(API_URLS.LLM, {
        method: 'POST',
        headers: HEADERS.JSON_CONTENT_TYPE,
        body: JSON.stringify({ prompt: prompt }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(SUCCESS_MESSAGES.LLM_RESPONSE_RECEIVED, data);
      // Handle the response data as needed
    } catch (error) {
      console.error(ERROR_MESSAGES.LLM_CALL_FAILED, error);
      // Handle error
    }
  }
};