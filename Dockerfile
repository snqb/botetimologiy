FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ ./src/
COPY data/ ./data/

# Create data directory if it doesn't exist
RUN mkdir -p data

# Expose port (not really needed for bot but good practice)
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the bot
CMD ["pnpm", "start"]
