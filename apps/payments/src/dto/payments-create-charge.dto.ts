import { CreateChargeDto } from "@app/common";
import { IsString } from "class-validator";

export class PaymentsCreateChargeDto extends CreateChargeDto{
@IsString()
email:string;
}