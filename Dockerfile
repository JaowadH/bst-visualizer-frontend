# ---------- Build stage ----------
# Use a Node version compatible with your tooling
FROM node:22-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Optional: bake API base at build time (set in Render as a build-time env var)
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Build the static site
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine
# SPA fallback for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Static assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
