# Imagem base derivada do Node
FROM node

# Diretório de trabalho
WORKDIR /app

# Copia todo o projeto (ou copie apenas o conteúdo do serviço se preferir)
COPY . /app

# Instala dependências
RUN npm install

# Comando para inicializar o serviço de Shipping
CMD ["node", "/app/services/shipping/index.js"]
