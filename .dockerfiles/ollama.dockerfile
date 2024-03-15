FROM ollama/ollama:latest

# Expose default Ollama API port "11434"
EXPOSE 11434

# (Optional) Customize Ollama command if needed
# Replace "-m cpu" with your desired memory allocation or other options
CMD ["ollama", "-m", "cpu"]
