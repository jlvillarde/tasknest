# Stage 1: Build the React application
# Use a Node.js base image to handle the build process
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
# This is a key optimization for Docker caching.
COPY package.json yarn.lock ./

# Install dependencies, ensuring we get the exact versions from yarn.lock
RUN corepack enable
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run the Vite build command to create the production static files
# These files will be placed in the `dist` directory
RUN yarn build

# --------------------------------------------------------------------
# Stage 2: Serve the production build with a lightweight web server (Nginx)
# Use a minimal Nginx base image
FROM nginx:alpine

# Copy the Nginx configuration file
# This file tells Nginx how to serve our application and handle routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the `builder` stage into the Nginx web root directory
# `--from=builder` specifies the source stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80, the default HTTP port for Nginx
EXPOSE 80

# Command to start the Nginx server
# `daemon off;` ensures Nginx runs in the foreground, which is required for Docker
CMD ["nginx", "-g", "daemon off;"]
