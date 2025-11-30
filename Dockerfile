# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Serve stage (nginx)
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config (optional tapi disarankan)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
