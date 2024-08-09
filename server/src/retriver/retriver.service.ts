/* import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class RetrieverService {
  readonly retriever;
  constructor(private readonly databaseService: DatabaseService) {
    this.retriever = this.databaseService.getVectorStore().asRetriever();
  }
  getRetriever(): any {
    return this.retriever;
  }
  // Add your methods and logic here
}
 */
