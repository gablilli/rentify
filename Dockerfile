FROM node:18-alpine

# Install dependencies for SQLite and Sharp
RUN apk add --no-cache \
    sqlite \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p /app/data/uploads /app/data/contracts /app/data/receipts /app/data/backups

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of data directory
RUN chown -R nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV DATABASE_PATH=/app/data/rental.db
ENV UPLOADS_PATH=/app/data/uploads
ENV CONTRACTS_PATH=/app/data/contracts
ENV RECEIPTS_PATH=/app/data/receipts

CMD ["npm", "start"]
