import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

export class WebSearchTool {
  webSearchTool: TavilySearchResults;
  constructor() {
    this.webSearchTool = new TavilySearchResults({ maxResults: 3 });
  }
  async run(question: string) {
    return await this.webSearchTool.invoke(question);
  }
}
