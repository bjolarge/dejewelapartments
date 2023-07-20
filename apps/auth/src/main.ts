import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
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
    //to enable depoloyment change the port value using the above.
  //await app.listen(3008);
  // I later used 3009
}
bootstrap();
