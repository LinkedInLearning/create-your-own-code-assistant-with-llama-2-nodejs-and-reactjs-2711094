import { Module } from '@nestjs/common';
import { IngestCommand } from './ingest.command';
import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { LogService } from 'src/log/log.service';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { RagService } from 'src/rag/rag/rag.service';
import { OllamaService } from 'src/ollama/ollama.service';
import { OllamaModule } from 'src/ollama/ollama.module';
import { RagModule } from 'src/rag/rag.module';

@Module({
  imports: [OllamaModule, RagModule],
  providers: [
    LogService,
    ConfigService,
    DataProcessingService,
    DatabaseService,
    OllamaService,
    IngestCommand,
  ],
  exports: [IngestCommand],
})
export class CliModule {}
