import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationsRepository } from '../reservations.repository';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
        PORT:Joi.number().required()
      })

    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
  exports:[ReservationsService]
})
export class ReservationModule {}