//import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { ConfigService } from '@nestjs/config';
import { PromptService } from 'src/prompt/prompt.service';
import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [],
  providers: [
    OllamaService,
    DataProcessingService,
    DatabaseService,
  
    ConfigService,
  ],
})
export class OllamaModule {}
