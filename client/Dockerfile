# --- BASE STAGE ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- DEVELOPMENT STAGE ---
FROM base AS development
COPY . .
ENV VITE_PORT=5173
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --- PRODUCTION STAGE ---
FROM base AS build
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]