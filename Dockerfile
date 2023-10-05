FROM node:18.18.0-alpine3.18

RUN usergroupadd -r app && useradd -r -g app app
USER app

WORKDIR /app

COPY ["package.json", "./"]
RUN npm i --force --legacy-peer-deps

COPY . .

EXPOSE 5173
EXPOSE 8000

CMD ["yarn", "server:dev"]

# Delete all containers  $ docker container rm -f $(docker container ls -aq)
# Build image  $ docker build -t ogada-swift-banking-frontend:1 .
# Start the container  $ docker run -p 5173:5173 -p 8000:8000 -itd ogada-swift-banking-frontend:1