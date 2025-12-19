require('reflect-metadata');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./app.module');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  console.log('Application is running on: http://localhost:4000');
}

bootstrap().catch(err => {
  console.error('Error starting application:', err);
  process.exit(1);
});
