### init project

1. install dependencies
   - if pnpm do not installed, use guide [here](https://pnpm.io/installation)
   - ```pnpm install```
2. run locally
   - back: ```pnpm run dev:back```
   - front: ```pnpm run dev:front```
   - front + back parallel: ```pnpm run dev```
3. run in dev docker container
   - if docker do not installed, use guide [here](https://docs.docker.com/engine/install/)
   - ```pnpm run dev:docker```

### utility

- ```pnpm run lint``` - biome lint + fix

### dependencies list

1. global
   - typescript - langauge
   - biome - linter + formatter
2. back
   - express - http interface
   - zod - validate
   - drizzle - orm for relations db (sqlite)
   - tsx - runtime for typescript
   - dotenv - .env files
3. front
   - react - front lib
   - vite - bundler + dev runtime for typescript
   - mantine - components lib