FROM node:24

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && apt-get clean

RUN corepack enable
RUN corepack prepare pnpm@10.17.1 --activate

WORKDIR /app
