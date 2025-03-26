#!/bin/sh

ollama serve &
sleep 5
ollama pull deepseek-r1:1.5b #lightest model
ollama pull deepseek-r1:8b
wait