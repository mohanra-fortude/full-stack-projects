FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install 
COPY . .
RUN npm run build
RUN rm -rf ./node_modules
RUN npm install --only=production

# Second Stage : Setup command to run your app using lightweight node image
FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
