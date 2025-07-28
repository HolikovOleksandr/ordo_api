# Use official Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Update packages
RUN apk update && apk upgrade

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the project (TypeScript → JavaScript)
RUN npm run build

# Expose port (optional)
EXPOSE 3000

# Start the server only if tests passed
CMD ["node", "dist/main"]
