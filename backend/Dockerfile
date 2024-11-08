# Use Node.js as the base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend code into the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port your backend service will run on
EXPOSE 8000

# Start the server in development mode
CMD ["npm", "run", "dev"]