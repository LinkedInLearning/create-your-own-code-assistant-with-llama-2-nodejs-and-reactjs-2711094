import { Module } from '@nestjs/common';
import { IngestCommand } from './ingest.command';
import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { LogService } from 'src/log/log.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [LogService, ConfigService, DataProcessingService, IngestCommand],
  exports: [IngestCommand],
})
export class CliModule {}
