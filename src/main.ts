import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './logger/logger.service';
import { CustomExceptionFilter } from './logger/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);

  const port = configService.get<number>('PORT') || 4001;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(port);
  console.log('Server is running on port:', port);
}
bootstrap();
