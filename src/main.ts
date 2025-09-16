import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Repair shop API')
    .setDescription('List of API for Repair shop app')
    .setVersion('1.0')
    .addTag('repair-shop')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger',
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove fields not in DTO
      forbidNonWhitelisted: true, // Throw error for extra fields
      transform: true, // Automatically transform payloads to DTOs
      exceptionFactory: (errors) => {
        const result = errors.map((err) => {
          // pick only the first constraint message per field
          return {
            field: err.property,
            message: Object.values(err.constraints ?? {}),
          };
        });
        return new BadRequestException(result);
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  console.log(`app is running on port ${port}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
