# Imagem base derivada do Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY . /app

# Instala as dependências
RUN npm install

# Executa o microsserviço Shipping
CMD ["node", "/app/services/shipping/index.js"]