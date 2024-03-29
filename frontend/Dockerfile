# Use official Node.js image as base
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production environment
FROM nginx:latest

# Copy built app to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
