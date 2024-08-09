import { Injectable } from '@nestjs/common';
//import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
//import { AxiosResponse } from 'axios';
//import { firstValueFrom } from 'rxjs';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { ChatOllama } from '@langchain/community/chat_models/ollama';

@Injectable()
export class OllamaService {
  embedings: OllamaEmbeddings;
  // CHat
  chat: ChatOllama;
  constructor(
    //private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.embedings = new OllamaEmbeddings({
      model: this.configService.get<string>('model'), //'llama2', // default value
      baseUrl: this.configService.get<string>('url'), //'http://localhost:11434', // default value
      requestOptions:
        this.configService.get<Record<string, string>>('requestOptions'),
    });
    this.chat = new ChatOllama({
      model: this.configService.get<string>('model'), //'llama2', // default value
      baseUrl: this.configService.get<string>('url'), //'http://localhost:11434', // default value
      format: this.configService.get<string>('format'), //'json', // default value
      temperature: this.configService.get<number>('chatTemperature', 0.5), // default value
      topP: this.configService.get<number>('topP', 1), // default value
      topK: this.configService.get<number>('topK', 40), // default value
    });
  }

  getEmbeddings(): OllamaEmbeddings {
    return this.embedings;
  }
  async sendPrompt(prompt: string): Promise<string> {
    this.chat.invoke(prompt);
    /*try {
      const apiUrl = this.configService.get<string>(
        'OLLAMA_API_URL',
        'https://api.ollama.example.com/send-prompt',
      );
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(apiUrl, { prompt }),
      );
      return response.data.response; // Assuming the response structure has a 'response' field
    } catch (error) {
      console.error('Error sending prompt to Ollama:', error);
      throw new Error('Failed to send prompt to Ollama');
    }*/
    return new Promise((resolve, reject) => {
      resolve('response');
    });
  }
}
