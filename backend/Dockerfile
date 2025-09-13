# ---- Stage 1: Builder ----
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && \
    yarn install --frozen-lockfile && \
    yarn cache clean

COPY . .
RUN yarn build

# ---- Stage 2: Dependencies ----
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && \
    yarn install --production --frozen-lockfile && \
    yarn cache clean

# ---- Stage 3: Production (Distroless) ----
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Distroless doesn't have shell, so direct node command
CMD ["dist/main"]