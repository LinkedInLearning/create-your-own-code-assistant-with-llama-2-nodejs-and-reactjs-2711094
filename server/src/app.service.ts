import { Injectable } from '@nestjs/common';
import { DataProcessingService } from './data-processing/data-processing.service';

@Injectable()
export class AppService {
  constructor(private dataProcessingService: DataProcessingService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async ingest(): Promise<any> {
    console.log('Ingesting data');
    await this.dataProcessingService.extractAndStoreData(process.cwd());
    return { message: 'Ingested data' };
  }
}
