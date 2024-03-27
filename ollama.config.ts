/** 
 * We will use this to ensure that the configuration
 * is consistent for ollama in all of our application 
 * areas.

*/
export const OllamaConfig = {
  url: "http://localhost:11434",
  model: "llama2",
  requestOptions: {
    useMMap: true, // use_mmap 1
    numThread: 6, // num_thread 6
    numGpu: 1, // num_gpu 1
  }
}
