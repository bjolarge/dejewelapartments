import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
//import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { NOTIFICATIONS_SERVICE,CreateChargeDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
@Injectable()
export class PaymentsService {
private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'),
{
  apiVersion:"2022-11-15"
}
);

constructor(private readonly configService:ConfigService, @Inject(NOTIFICATIONS_SERVICE)
private readonly notificationsService:ClientProxy,){}

async createCharge({ card,amount,email}:PaymentsCreateChargeDto){
  const paymentMethod = await this.stripe.paymentMethods.create({
    type: 'card',
    card,
  });

  const paymentIntent = await this.stripe.paymentIntents.create({
    //commented the below down to prevent rapid change as a result of stripe api requirements
    //payment_method: paymentMethod.id,
    amount:amount*100,
    confirm:true,
    currency:'usd',
    //payment_method:'pm_card_visa',
    payment_method_types: ['card'],
   
  });

  this.notificationsService.emit('notify_email',{email});

  return paymentIntent;
}
}
