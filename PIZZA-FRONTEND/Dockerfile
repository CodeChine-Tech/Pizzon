# Stage 1: Base image
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Stage 2: Install dependencies
FROM base AS builder
WORKDIR /app
# Copy workspace definitions
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY artifacts/pizzon/package.json artifacts/pizzon/
COPY artifacts/pizzon-admin/package.json artifacts/pizzon-admin/
# Install all dependencies precisely as per lockfile
RUN pnpm install --frozen-lockfile

COPY . .

# Run the build scripts
RUN pnpm build
RUN pnpm build:admin

# Stage 4: Production Runner (Nginx)
FROM nginx:alpine AS runner
# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/pizza.conf

# Copy built assets
COPY --from=builder /app/artifacts/pizzon/dist /usr/share/nginx/html/pizzon
COPY --from=builder /app/artifacts/pizzon-admin/admin-dist /usr/share/nginx/html/admin

# Expose ports for both applications
EXPOSE 80
EXPOSE 5174

CMD ["nginx", "-g", "daemon off;"]
