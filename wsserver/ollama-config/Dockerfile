FROM ollama/ollama:latest

WORKDIR /ollama-config

COPY start-model.sh /ollama-config/start-model.sh

EXPOSE 11434

RUN chmod +x start-model.sh

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]

CMD ["./start-model.sh"]
