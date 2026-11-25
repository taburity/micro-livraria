# Imagem base derivada do Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Comando para copiar os arquivos para a pasta /app da imagem
COPY . /app

# Comando para instalar as dependências
RUN npm install

# Expõe a porta original do serviço Shipping
EXPOSE 3001

# Comando para inicializar (executar) a aplicação
CMD ["node", "/app/services/shipping/index.js"]
