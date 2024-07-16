import { Injectable } from '@nestjs/common';
import { ESLint } from 'eslint'; // Assuming ESLint is installed globally
import { PrismaClient, Prisma } from '@prisma/client';

import {
  DirectoryLoader,
  UnknownHandling,
} from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PrismaVectorStore } from '@langchain/community/vectorstores/prisma';

import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import path from 'node:path';
import { ConfigService } from '@nestjs/config';

/**
 * next make an agent and chain that is called from the rest endpoint
 */

@Injectable()
export class DataProcessingService {
  private readonly eslint = new ESLint({ fix: false });
  private readonly prisma = new PrismaClient();
  private vectorStore;
  constructor(private config: ConfigService) {}

  async extractAndStoreData(directory): Promise<void> {
    console.log('this is the current dir', directory);
    // ... (code for data extraction and storage)
    const docs = await this.loadWorkspace(directory);
    const texts = await this.extract(docs);
    // figure out incremental updates
    this.vectorStore = await this.storeGraph(texts);
  }
  /**
   * Loads the current workspace into embedings
   */
  async loadWorkspace(directory) {
    const REPO_PATH = directory || this.config.get<string>('workspace'); //path.join(/*import.meta.url,*/ __dirname, directory); // load from config file
    const loaders = this.config.get<string[]>('loaders') || [
      '.ts',
      '.js',
      '.json',
      '.jsonc',
      '.md',
    ];
    const exclude_globs = this.config.get<string[]>('exclude');
    console.log('loaders: ', exclude_globs);

    const loads = loaders.reduce((acc, cur) => {
      //console.log('key', cur, acc);
      acc[cur] = (path) => new TextLoader(path);
      return acc;
    }, {});
    //console.log(`${REPO_PATH}, ${JSON.stringify(loads, null, 2)}`);

    // can not exclude
    const loader = new DirectoryLoader(
      REPO_PATH,
      loads,
      true,
      UnknownHandling.Ignore,
      exclude_globs,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const docs = await loader.load();
    //return;
    //console.log(docs);
    return docs;
  }
  // Single unit of work
  async extract(docs: any) {
    const javascriptSplitter = RecursiveCharacterTextSplitter.fromLanguage(
      'js',
      {
        chunkSize: 2000,
        chunkOverlap: 200,
      },
    );
    const texts = await javascriptSplitter.splitDocuments(docs);

    console.log('Loaded ', texts.length, ' documents.');

    return texts;
  }

  async storeGraph(texts: any): Promise<any> {
    // This will evetually be a langchain langgraph
    const vectorStore = await PrismaVectorStore.fromDocuments(
      texts,
      new OllamaEmbeddings({
        model: this.config.get<string>('model'), //'llama2', // default value
        baseUrl: this.config.get<string>('url'), //'http://localhost:11434', // default value
        requestOptions:
          this.config.get<Record<string, string>>('requestOptions'),
      }),
      {
        db: this.prisma,
        prisma: Prisma,
        tableName: this.config.get<string>('database.tableName'), //'documents',
        vectorColumnName: this.config.get<string>('database.columnName'), //match_documents',
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
        },
      },
    );
    return vectorStore;
  }
}
