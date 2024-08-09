import type { Document } from '@langchain/core/documents';

export interface AdaptiveRAGGraphState {
  question: string;
  generation: string;
  documents: Document[];
}

// This defines the agent state.
// Returned documents from a node will override the current
// "documents" value in the state object.
export const graphState = {
  question: null,
  generation: null,
  documents: {
    value: (x: Document[], y: Document[]) => y,
    default: () => [],
  },
};
