FROM node:12.18.4-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app/.

EXPOSE 9030
CMD npm run start
