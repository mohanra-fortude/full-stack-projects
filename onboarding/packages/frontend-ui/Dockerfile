# pull official base image
FROM node:14.17.0-alpine3.11 as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependenciesdoc
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

RUN npm run build

# nginx server will front-end the app
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN apk add --no-cache tzdata
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone 

COPY --from=builder /app/build .

# Add bash
RUN apk add --no-cache bash
ENTRYPOINT ["nginx", "-g", "daemon off;"]
#COPY ./env.sh .
# Make our shell script executable
#RUN chmod +x env.sh

# Start Nginx server
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

#EXPOSE 8080
