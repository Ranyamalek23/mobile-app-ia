import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.authService.login(email, password);
        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }
        return user;
    }

    @Post('register')
    async register(@Body() user: CreateUserDto) {
        return this.authService.register(user);
    }
}
