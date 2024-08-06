import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Reuse Moda Sustentável')
    .setDescription('Projeto Reuse Moda Sustentável')
    .setContact("Generation Brasil", "github.com/ReUse-Moda-Sustentavel", "reusemodasustentavelgen@gmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe);

  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap(); //teste
