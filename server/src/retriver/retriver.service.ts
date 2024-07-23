import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class RetrieverService {
  readonly retriever: unknown;
  constructor(private readonly databaseService: DatabaseService) {
    this.retriever = this.databaseService.getVectorStore().asRetriever();
  }
  getRetriever(): unknown {
    return this.retriever;
  }
  // Add your methods and logic here
}
