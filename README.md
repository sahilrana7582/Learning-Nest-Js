<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)](https://circleci.com/gh/nestjs/nest)
[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![Package License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![Coverage](https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master)](https://coveralls.io/github/nestjs/nest?branch=master)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)
[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)

## Blog Application

A powerful and flexible blog application built with [NestJS](https://nestjs.com) and [TypeORM](https://typeorm.io). This application supports advanced features such as user authentication, post management, tagging, and more.

## Features

- **User Authentication**: Secure user registration and login.
- **Post Management**: Create, read, update, and delete blog posts.
- **Tagging System**: Organize posts with tags for better categorization.
- **Comments Section**: Allow users to comment on posts.
- **Rich Text Editor**: Use a rich text editor for creating posts.
- **Image Uploads**: Support for uploading images to posts.
- **Search Functionality**: Search through posts by title or content.
- **Pagination**: Efficiently display posts with pagination.
- **RESTful API**: Fully functional REST API for frontend integration.
- **Environment Configuration**: Easily configurable environment variables.

## Project Setup

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/your-blog-app.git
   cd your-blog-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=blog
   JWT_SECRET=your_jwt_secret
   ```

## Compile and Run the Project

You can run the project in different modes:

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Run Tests

To run the tests, use the following commands:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, follow these steps:

1. Ensure your application is production-ready.
2. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.
3. For cloud-based deployment, consider using [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS.

```bash
npm install -g mau
mau deploy
```

## Advanced Settings

### TypeORM Configuration

You can customize your TypeORM settings in `app/src/app.module.ts`:

```typescript
TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Post],
    synchronize: true,
  }),
}),
```

### Middleware and Guards

Implement middleware for logging and guards for protecting routes. You can create custom guards to restrict access to certain endpoints based on user roles.

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Discord Channel](https://discord.gg/G7Qnnhy)
- [Official Video Courses](https://courses.nestjs.com/)
- [NestJS Mau](https://mau.nestjs.com)
- [NestJS Devtools](https://devtools.nestjs.com)
- [Enterprise Support](https://enterprise.nestjs.com)
- [Jobs Board](https://jobs.nestjs.com)

## Support

Nest is an MIT-licensed open-source project. It thrives thanks to the support of amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in Touch

- Author: [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website: [nestjs.com](https://nestjs.com/)
- Twitter: [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).