import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { ResponseFormat } from './infrastructure/common/interceptors/response.interceptor';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';
import { LoggerService } from './infrastructure/logger/logger.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  //const app = await NestFactory.create(AppModule, { httpsOptions });
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const configService: EnvironmentConfigService = app.get(
    EnvironmentConfigService,
  );

  let certFilePath = '';
  let certKeyFilePath = '';
  app.enableCors();
  if (env !== 'production') {
    certFilePath = './secrets/cert.pem';
    certKeyFilePath = './secrets/cert.key';
  } else {
    /* app.enableCors({
      origin: configService.getClientHost(),
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }); */
    certFilePath = './secrets/certificate.crt';
    certKeyFilePath = './secrets/private.key';
  }
  const httpsOptions = {
    key: fs.readFileSync(`${certKeyFilePath}`),
    cert: fs.readFileSync(`${certFilePath}`),
  };

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  //app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  //app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      //.addBearerAuth()
      .setTitle('Recipes API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  // await app.listen(3000);
  await app.init();

  const httpServer = http
    .createServer(server)
    .listen(configService.getHttpPort());
  const httpsServer = https
    .createServer(httpsOptions, server)
    .listen(configService.getHttpsPort());
}
bootstrap();
