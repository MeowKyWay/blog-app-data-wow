# Use an official Node.js runtime as a parent image
FROM node:23-slim

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y openssl

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Generate Prisma client for linux-arm64-openssl-1.1.x
RUN npx prisma generate

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3001

# Run the app
CMD ["npm", "start"]