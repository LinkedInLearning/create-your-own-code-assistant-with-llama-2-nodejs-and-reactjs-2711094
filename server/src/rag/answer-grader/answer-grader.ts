import { BaseGrader } from '../base-grader/base-grader';

export class AnswerGrader extends BaseGrader {
  constructor(chat: any) {
    super(
      chat,
      `You are a grader assessing whether an answer is useful to resolve a question.
        Here is the answer:

        <answer>
        {generation} 
        </answer>

        Here is the question:

        <question>
        {question}
        </question>

        Give a binary score 'yes' or 'no' to indicate whether the answer is useful to resolve a question.
        Provide the binary score as a JSON with a single key 'score' and no preamble or explanation.`,
    );
  }
}
