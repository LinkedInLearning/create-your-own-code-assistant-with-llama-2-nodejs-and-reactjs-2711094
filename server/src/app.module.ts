import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataProcessingService } from './data-processing/data-processing.service';
import { CliModule } from './cli/cli.module';
import { LogService } from './log/log.service';
import CustomConfigLoader from './custom-config/custom-config.service';
import { ConfigModule } from '@nestjs/config';
import { IngestCommand } from './cli/ingest.command';
import { PromptService } from './prompt/prompt.service';

@Module({
  imports: [
    CliModule,
    //IngestCommand,
    ConfigModule.forRoot({
      // @ts-expect-error this is an error
      load: [CustomConfigLoader],
    }),
  ],
  //controllers: [AppController],
  providers: [AppService, DataProcessingService, LogService, PromptService],
})
export class AppModule {}
