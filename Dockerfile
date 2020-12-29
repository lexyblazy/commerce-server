FROM node:alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

FROM nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf