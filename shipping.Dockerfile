# Imagem base Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY . /app

# Instala dependências
RUN npm install

# Executa o serviço Shipping
CMD ["node", "/app/services/shipping/index.js"]
