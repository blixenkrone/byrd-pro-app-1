# docker build --build-arg "env=${env}" --rm -f "Dockerfile" -t byrdapp/pro-app:${ENV}${TAG}.
FROM node:12.15.0-alpine AS builder
LABEL Maintainer = Simon Blixenkrone

ARG env=dev
ENV build_arg=build-${env}

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY . /app

RUN yarn ${build_arg}

# # Step 2: Use build output from 'builder'
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/byrd-pro-app .
