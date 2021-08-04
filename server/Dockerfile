# server/Dockerfile-dev

# Install node image in container
FROM node

# Create and set the working directory
RUN mkdir -p /app/server
WORKDIR /app/server

# Copy the dependency files over
COPY package*.json /app/server/

# Install dependencies
RUN npm install

# Copy the server files over
COPY . /app/server/

# Command to run them
CMD ["npm", "start"]
