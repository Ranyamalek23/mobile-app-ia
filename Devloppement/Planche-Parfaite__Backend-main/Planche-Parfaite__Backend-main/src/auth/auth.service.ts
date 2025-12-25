import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { chown } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}
    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email)
        if(user && await this.usersService.validatePassword(user,password)){
            const payload = {sub: user.id, username: user.name}
            const {password, ...result} = user;
            return {
                access_token: await this.jwtService.signAsync(payload),
                ...result
            };
        }
        return null
    }

    async register(user: CreateUserDto): Promise<any>{
        return this.usersService.create(user);
    }
}
