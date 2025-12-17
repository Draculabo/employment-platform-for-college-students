# Employment Platform for College Students

> A comprehensive employment platform designed for college students, featuring a modern collaborative environment.

This project is a monorepo containing both the frontend and backend services for the Employment Platform. It leverages modern web technologies to provide a responsive and feature-rich experience.

## Features

### Frontend (`packages/frontend`)
- **Framework**: Vue 3 with Vite
- **UI Component Library**: Element Plus
- **Styling**: TailwindCSS & SCSS
- **State Management**: Pinia
- **Editors**: Integrated ByteMD and TextBus for rich text editing.
- **Utilities**: `vueuse`, `lodash`, `axios`.

### Backend (`packages/backend`)
- **Framework**: Fastify
- **Database**:
    - MySQL (via TypeORM)
    - Redis (via `ioredis`) for caching and session management.
    - MongoDB (via `mongodb`)
- **AI Integration**: Integration with ChatGPT and Bing Chat for intelligent features.
- **Third-party Services**:
    - Alibaba Cloud OSS (Object Storage Service)
    - Alibaba Cloud SMS
- **API Documentation**: Fastify Swagger

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (Package Manager)

### Installation

Install all dependencies for the monorepo:

```bash
pnpm install
```

### Development

To start the development servers:

**Frontend**:
```bash
pnpm front
# Runs `pnpm --filter frontend dev`
```

**Backend**:
```bash
pnpm back
# Runs `pnpm --filter backend start`
```

**Backend (Node Mode)**:
```bash
pnpm back:node
# Runs `pnpm --filter backend start:node`
```

## Project Structure

- `packages/frontend`: Source code for the web client.
- `packages/backend`: Source code for the server-side API.
- `package.json`: Root configuration and workspace scripts.

## License

This project is licensed under the MIT License.
