import { EXTRA_MODEL } from '@common/constants/extra-model.const';
import { APP_LOCALES, Locales } from '@common/constants/global.const';
import { handleLogInfo } from '@common/utils/helper.utils';
import { AuthGuard } from '@guards/auth.guard';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@modules/auth/auth.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import * as i18n from 'i18n';
import * as path from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exception.filter';
import { setLocal } from './middlewares/locales.middleware';
import { TrimPipe } from './pipes/trim.pipe';

const PORT = process.env.APP_PORT || 3001;
const BASE_PATH = '/api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn'],
  });

  app.set('trust proxy', 'loopback');
  app.setGlobalPrefix(BASE_PATH);

  i18n.configure({
    locales: APP_LOCALES,
    defaultLocale: Locales.EN,
    objectNotation: true,
    directory: path.join(__dirname, '/assets/lang'),
  });
  app.use(i18n.init);
  app.use(setLocal);
  app.use(json({ limit: process.env.LIMIT_REQUEST_BODY }));
  app.use(
    urlencoded({
      extended: true,
      limit: process.env.LIMIT_REQUEST_BODY,
    }),
  );
  const authService = app.select(AuthModule).get(AuthService);

  app.useGlobalGuards(new AuthGuard(new Reflector(), new JwtService(), authService));
  app.enableCors({});
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  process.env.NODE_ENV !== 'production' && configSwagger(app);
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new TrimPipe());
  await app.listen(PORT, () => {
    handleLogInfo(`App is running with port ${PORT}`);
  });
}

function configSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Open-Site Backend')
    .setDescription('Open-Site Backend API')
    .addBearerAuth({
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const options: SwaggerDocumentOptions = {
    extraModels: EXTRA_MODEL,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup(BASE_PATH, app, document);
}

bootstrap();
