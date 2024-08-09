import type { Document } from '@langchain/core/documents';

export const Utils = {
  // Post-processing
  formatDocs: (docs: Document[]) => {
    return docs.map((doc) => doc.pageContent).join('\n\n');
  },
};
