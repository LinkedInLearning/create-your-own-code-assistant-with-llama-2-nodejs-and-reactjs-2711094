import { createRetrieverTool } from 'langchain/tools/retriever';
import { ToolExecutor } from '@langchain/langgraph/prebuilt';

const tool = createRetrieverTool(retriever, {
  name: 'retrieve_code_files',
  description: 'Retrieve code files from a repository',
});

const tools = [tool];

const toolExecutor = new ToolExecutor({
  tools,
});
