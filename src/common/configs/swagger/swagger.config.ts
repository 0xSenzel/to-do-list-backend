import { DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    'access_token',
  )
  .setTitle('To-Do List Swagger API')
  .setDescription('API documentation for to do list app')
  .setVersion('1.0')
  .build();

export { swaggerOptions };
