import { Injectable } from '@nestjs/common';
import type { BaseRetrieverInterface } from '@langchain/core/retrievers';

import { createRetrieverTool } from 'langchain/tools/retriever';
import { ToolExecutor } from '@langchain/langgraph/prebuilt';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class RetrieverService {
  readonly retriever: BaseRetrieverInterface<Record<string, any>>;
  toolExecutor: any;
  constructor(private readonly databaseService: DatabaseService) {
    this.retriever = this.databaseService.getVectorStore().asRetriever();
    const tool = createRetrieverTool(
      this.retriever as BaseRetrieverInterface<Record<string, any>>,
      {
        name: 'retrieve_code_files',
        description: 'Retrieve code files from a repository',
      },
    );
    this.toolExecutor = new ToolExecutor({
      tools: [tool],
    });
  }
  getRetriever(): any {
    return this.retriever;
  }

  // Add your methods and logic here
}
