import { IsDate, IsString } from 'class-validator';
export class CreateReservationDto{
   @IsDate()
    startDate:Date; 
    @IsDate()
    endDate:Date;
    @IsString()
    placeId:string;
   @IsString()
    invoiceId:string;
//    userId:string;
//    timestamp:Date;
}