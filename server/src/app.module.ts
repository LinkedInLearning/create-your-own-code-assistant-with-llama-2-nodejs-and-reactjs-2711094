import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataProcessingService } from './data-processing/data-processing.service';
import { CliModule } from './cli/cli.module';
import { LogService } from './log/log.service';
import CustomConfigLoader from './custom-config/custom-config.service';
import { ConfigModule } from '@nestjs/config';
import { PromptService } from './prompt/prompt.service';
import { DatabaseService } from './database/database.service';
import { RagModule } from './rag/rag.module';
import { OllamaModule } from './ollama/ollama.module';
import { OllamaService } from './ollama/ollama.service';
import { RagService } from './rag/rag/rag.service';

@Module({
  imports: [
    CliModule,
    //IngestCommand,
    ConfigModule.forRoot({
      // @ts-expect-error this is an error
      load: [CustomConfigLoader],
    }),
    OllamaModule,
    RagModule,
  ],
  controllers: [AppController],
  providers: [
    OllamaService,
    AppService,
    DataProcessingService,
    LogService,
    PromptService,
    DatabaseService,
    RagService,
  ],
})
export class AppModule {}
