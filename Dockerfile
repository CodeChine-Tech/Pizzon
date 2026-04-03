# Lightweight Node.js image
FROM node:18-alpine

# Working directory inside container
WORKDIR /app

# Copy only package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Command to start the server
CMD ["node", "server.js"]
