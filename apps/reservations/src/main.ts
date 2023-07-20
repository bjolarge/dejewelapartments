import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ReservationModule } from './reservation.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
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
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT'));
    //replace the below code to enable deployment without hardcoding the port number
  //await app.listen(3007);
}
bootstrap();
