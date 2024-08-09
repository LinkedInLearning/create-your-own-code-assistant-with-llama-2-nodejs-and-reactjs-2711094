import { BaseGrader } from '../base-grader/base-grader';

export class HallucinationGrader extends BaseGrader {
  constructor(chat: any) {
    super(
      chat,
      `You are a grader assessing whether an answer is grounded in / supported by a set of facts.
        Here are the facts used as context to generate the answer:

        <context>
        {context} 
        </context>

        Here is the answer:

        <answer>
        {generation}
        </answer>

        Give a binary score 'yes' or 'no' score to indicate whether the answer is grounded in / supported by a set of facts.
        Provide the binary score as a JSON with a single key 'score' and no preamble or explanation.`,
    );
  }
}
