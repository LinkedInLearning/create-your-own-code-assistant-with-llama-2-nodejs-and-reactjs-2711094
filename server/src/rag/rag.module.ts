import { Module } from '@nestjs/common';
import { RetrieverService } from './retriever/retriever.service';
import { RagService } from './rag/rag.service';
import { DatabaseService } from 'src/database/database.service';
import { OllamaService } from 'src/ollama/ollama.service';
import { ConfigService } from '@nestjs/config';
import { OllamaModule } from 'src/ollama/ollama.module';

@Module({
  imports: [OllamaModule],
  providers: [
    RetrieverService,
    DatabaseService,
    OllamaService,
    ConfigService,
    RagService,
  ],
  exports: [RetrieverService, RagService],
})
export class RagModule {}
