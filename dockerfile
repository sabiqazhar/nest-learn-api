FROM node:lts-buster-slim
EXPOSE 8000
WORKDIR /src
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
CMD ["node", "dist/main"]