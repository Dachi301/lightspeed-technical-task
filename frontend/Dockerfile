# Use Node.js as the base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend code into the container
COPY . .

# Expose the port your frontend service will run on
EXPOSE 5173

# Start the frontend server in development mode
CMD ["npm", "run", "dev"]