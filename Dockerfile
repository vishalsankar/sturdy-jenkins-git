FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching install step)
COPY package*.json ./

# Install dependencies
RUN npm install

# Now copy the rest of the source code
COPY . .

# Expose port and run the app
EXPOSE 3000
CMD ["node", "index.js"]
