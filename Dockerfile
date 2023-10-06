FROM node:18.18.0-alpine3.18

RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /app

COPY ["package.json", "./"]
RUN npm i --force --legacy-peer-deps

# FOR DEV environment
# The default "esbuild" failed to run dev server due incompatible platform (BECAUSE I USED ... -v $(pwd):/app ... to run the container)
# RUN npm i esbuild-wasm --legacy-peer-deps OR add "esbuild-wasm": "^0.19.4" to package.json


COPY ["./", "./"]

EXPOSE 5173
EXPOSE 8000
EXPOSE 80


CMD ["yarn", "server:dev"]
# CMD ["yarn", "start"]

# Delete all containers  $ docker container rm -f $(docker container ls -aq)
# Build image  $ docker build -t ogada-swift-banking-frontend:1 .

# For starting on DEV environment
# Install all deps on the HOST $ npm i --force --legacy-peer-deps
# Start the container  $ docker run -d -p 5173:5173 -p 8000:8000 -v $(pwd):/app ogada-swift-banking-frontend:1

# For starting on PROD environment
# Start the container  $ docker run -d -p 5173:5173 -p 8000:8000 ogada-swift-banking-frontend:1