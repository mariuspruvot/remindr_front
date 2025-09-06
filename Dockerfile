FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]