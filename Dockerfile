FROM node:18-alpine

# Install pnpm using corepack (built into Node 18+)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY src/ ./src/

# Create data directory for JSON storage
RUN mkdir -p data

# Set environment
ENV NODE_ENV=production

# Start the bot
CMD ["pnpm", "start"]
