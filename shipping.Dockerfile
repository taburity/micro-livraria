# Imagem base derivada do Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Copia todos os arquivos do projeto
COPY . /app

# Instala as dependências
RUN npm install

# Inicializa o serviço Shipping
CMD ["node", "/app/services/shipping/index.js"]