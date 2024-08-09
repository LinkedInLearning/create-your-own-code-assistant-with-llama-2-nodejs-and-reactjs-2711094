import { PrismaVectorStore } from '@langchain/community/vectorstores/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OllamaService } from 'src/ollama/ollama.service';

import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class DatabaseService {
  private vectorStore;
  private readonly prisma = new PrismaClient();
  constructor(
    private ollamaService: OllamaService,
    private configService: ConfigService,
  ) {
    this.initVectorStore();
  }

  getVectorStore() {
    console.log('getting vector store');
    return this.vectorStore;
  }
  async addDocuments(documents: any[]): Promise<void> {
    await this.vectorStore.addDocuments(documents);
  }
  async initVectorStore(): Promise<void> {
    console.log('calling init vector store');
    this.vectorStore = await new PrismaVectorStore(
      this.ollamaService.getEmbeddings(),
      {
        db: this.prisma,
        prisma: Prisma,
        tableName: this.configService.get<string>('database.tableName'), //'documents',
        vectorColumnName: this.configService.get<string>('database.columnName'), //match_documents',
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
      },
    );
    // ... (code for initializing the vector store)
  }
}
