#  Dockerfile for Node Express Backend

FROM node:12.18.0

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm i

# Copy app source code
COPY . .

# Exports
EXPOSE 3001

CMD ["npm","start"]