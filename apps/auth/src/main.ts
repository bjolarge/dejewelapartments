import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import {Transport} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({transport: Transport.TCP,
  options:{
    host:'0.0.0.0',
    port:configService.get('TCP_PORT'),
  },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted:true,
      transformOptions:{
      enableImplicitConversion:true,
      }
    })),
    app.useLogger(app.get(Logger));
   // await app.listen(configService.get('PORT'));
   await app.startAllMicroservices();
    await app.listen(configService.get('HTTP_PORT'));
    //to enable deployment change the port value using the above.
  //await app.listen(3008);
  // I later used 3009
}
bootstrap();
