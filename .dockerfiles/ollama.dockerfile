FROM ollama/ollama:latest

EXPOSE 11434
ENTRYPOINT [ "/bin/ollama" ]
RUN /bin/ollama create example -f Modelfile
RUN ollama pull "llama2"


CMD ["serve"]