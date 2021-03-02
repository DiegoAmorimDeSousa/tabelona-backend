FROM node:lts
RUN apt-get update
RUN apt-get install ffmpeg -y

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY src /app/src
COPY config /app/config
COPY blip-chat-widget /app/blip-chat-widget
COPY bot-widget-html /app/bot-widget-html

EXPOSE 3333
CMD npm run start
