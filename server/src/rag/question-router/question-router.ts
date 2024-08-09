import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
export class QuestionRouter {
  chat: ChatOllama;
  topics = ['llm', 'agent', 'memory'];
  QUESTION_ROUTER_SYSTEM_TEMPLATE = `You are an expert at routing a user question to a vectorstore or web search.
Use the vectorstore for questions on ${this.topics}.
You do not need to be stringent with the keywords in the question related to these topics.
Otherwise, use web-search. Give a binary choice 'web_search' or 'vectorstore' based on the question.
Return the a JSON with a single key 'datasource' and no preamble or explanation.`;
  QUESTION_ROUTER_PROMPT = ChatPromptTemplate.fromMessages([
    ['system', this.QUESTION_ROUTER_SYSTEM_TEMPLATE],
    ['human', '{question}'],
  ]);
  questionRouter: any;

  constructor(chat: ChatOllama) {
    this.chat = chat;
    this.questionRouter = this.QUESTION_ROUTER_PROMPT.pipe(this.chat).pipe(
      new JsonOutputParser(),
    );
  }

  public async run(question: string) {
    return this.questionRouter.invoke({ question });
  }
}
