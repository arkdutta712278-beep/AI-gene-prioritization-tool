# GitHub Actions CI pipeline
# Runs on every push and pull request to main
# Vercel reads this repo and auto-deploys on merge to main

name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Lint + Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript type check
        run: npx tsc --noEmit

      - name: Run ESLint
        run: npm run lint

      - name: Run unit tests
        run: npm test
        env:
          # Tests use mocked fetch — no real API keys needed in CI
          ANTHROPIC_API_KEY: sk-ant-placeholder

  build:
    name: Next.js build check
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - name: Build
        run: npm run build
        env:
          ANTHROPIC_API_KEY: sk-ant-placeholder
          # Other env vars can stay empty for build check
          EXOMISER_API_URL: ""
          PINECONE_API_KEY: ""
          PINECONE_INDEX: ""
