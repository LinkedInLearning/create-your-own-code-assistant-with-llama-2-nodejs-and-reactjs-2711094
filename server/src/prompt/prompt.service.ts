import { Injectable } from '@nestjs/common';
import { DataProcessingService } from '../data-processing/data-processing.service';
import { OllamaService } from '../ollama/ollama.service';
import { RagService } from 'src/rag/rag/rag.service';

@Injectable()
export class PromptService {
  constructor(
    private readonly dataProcessingService: DataProcessingService,
    private readonly ragService: RagService,
  ) {}
  /// We need to add our ollama chat to here and format the prompts

  async handleChatPrompt(prompt: string): Promise<string> {
    // Step 1: Send prompt to Ollama
    //const ollamaResponse = await this.ollamaService.sendPrompt(prompt);

    // Step 2: Retrieve related information from the vector store
    /*  const relatedInfo =
      await this.dataProcessingService.retrieveRelatedInformation(prompt);

    // Step 3: Use RAG to augment the Ollama response with the retrieved information
    const augmentedResponse = this.augmentResponseWithRelatedInfo(
      ollamaResponse,
      relatedInfo,
    ); */

    // Step 4: Consider Memory for context-aware responses (not shown here)
    const response = this.ragService.run(prompt);
    return response; // augmentedResponse;
  }

  private augmentResponseWithRelatedInfo(
    ollamaResponse: string,
    relatedInfo: any,
  ): string {
    // Implement logic to augment the Ollama response with information from the vector store
    // This is a placeholder implementation
    return `${ollamaResponse}\n\nRelated Information:\n${relatedInfo}`;
  }
}
