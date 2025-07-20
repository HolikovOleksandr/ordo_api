# Use official Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the project (if using TypeScript)
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
