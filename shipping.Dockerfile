# Imagem base
FROM node

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY . /app

# Instalar dependências
RUN npm install

# Iniciar a aplicação
CMD ["node", "/app/services/shipping/index.js"]