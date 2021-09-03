ARG IMAGE_VERSION
# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:${IMAGE_VERSION} AS development

# Specify Working directory inside container
WORKDIR /mohank/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./

# Install deps inside container
RUN npm install

RUN npm run build

EXPOSE 8000

################
## PRODUCTION ##
################
# Build another image named production
FROM node:${IMAGE_VERSION}} AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set work dir
WORKDIR /mohank/src/app

COPY --from=development /mohank/src/app/ .

EXPOSE 8000

# run app
CMD [ "node", "dist/main"]