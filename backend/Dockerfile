# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files and install
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code and build the app
COPY . .
RUN yarn build

# -----------------------
# Stage 2: Production Image
FROM node:22-alpine
WORKDIR /app
USER node

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --production --frozen-lockfile

COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE 3000
CMD ["yarn", "start:prod"]