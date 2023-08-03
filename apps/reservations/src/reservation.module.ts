import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
//import { DatabaseModule, LoggerModule } from '@app/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationsRepository } from '../reservations.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/common/constants/services';

@Module({
  imports:[
    DatabaseModule,
    DatabaseModule.forFeature([
        {name:ReservationDocument.name, schema: ReservationSchema},
    ]),
    LoggerModule,
    //add individual config module to benefit from the adv of microservice
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema: Joi.object({
        MONGODB_URI:Joi.string().required(),
        PORT:Joi.number().required(),
        AUTH_HOST:Joi.string().required(),
        PAYMENTS_HOST: Joi.string().required(),
        AUTH_PORT:Joi.number().required(),
        PAYMENTS_PORT:Joi.number().required()
      })

    }),
    ClientsModule.registerAsync([
      {
        name:AUTH_SERVICE,
        useFactory:(configService:ConfigService)=>({
          transport:Transport.TCP,
          options:{
            host:configService.get('AUTH_HOST'),
            port:configService.get('AUTH_PORT'),
          },
        }),
        inject:[ConfigService],
      },
      {
        name:PAYMENTS_SERVICE,
        useFactory:(configService:ConfigService)=>({
          transport:Transport.TCP,
          options:{
            host:configService.get('PAYMENTS_HOST'),
            port:configService.get('PAYMENTS_PORT'),
          },
        }),
        inject:[ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  exports:[ReservationsService]
})
export class ReservationModule {}
