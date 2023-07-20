import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import {PassportStrategy} from '@nestjs/passport';
//import * as PassportStrategy from '@nestjs/passport';
import {Strategy} from 'passport-local';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly usersService:UsersService){
        super({usernameField:'email'})
    }

    async validate(email:string, password:string){
        try {
            return await this.usersService.verifyUser(email,password);

        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}