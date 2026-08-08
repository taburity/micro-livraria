# Define a imagem base
FROM node:18-slim

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração de pacotes
COPY package*.json ./

# Instala as dependências dentro do container
RUN npm install

# Copia o restante do código do serviço Shipping
COPY . .

# Informa que o container vai usar a porta 3001
EXPOSE 3001

# Comando para subir o serviço
CMD ["npm", "start"]