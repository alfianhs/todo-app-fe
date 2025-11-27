# ---------- Build Stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only package files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build project
RUN pnpm build


# ---------- Production Stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output from builder
COPY --from=builder /app/dist .

# Copy nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
