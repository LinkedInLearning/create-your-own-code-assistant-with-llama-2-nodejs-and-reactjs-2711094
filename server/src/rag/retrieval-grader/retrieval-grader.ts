import { ChatPromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import type { Document } from '@langchain/core/documents';
export class RetrievalGrader {
  retrievalGrader: any;
  readonly GRADER_TEMPLATE: string = `You are a grader assessing relevance of a retrieved document to a user question.
Here is the retrieved document:


{content}


Here is the user question:

{question}


If the document contains keywords related to the user question, grade it as relevant.
It does not need to be a stringent test. The goal is to filter out erroneous retrievals.
Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question.
Provide the binary score as a JSON with a single key 'score' and no preamble or explanation.`;
  gradingPrompt: any;
  constructor(private readonly chat: ChatOllama) {
    this.gradingPrompt = ChatPromptTemplate.fromTemplate(this.GRADER_TEMPLATE);
    this.retrievalGrader = this.gradingPrompt
      .pipe(this.chat)
      .pipe(new JsonOutputParser());
  }

  async run(question: string, docs: Document[]) {
    return await this.retrievalGrader.invoke({
      question,
      content: docs[0].pageContent,
    });
  }
}
