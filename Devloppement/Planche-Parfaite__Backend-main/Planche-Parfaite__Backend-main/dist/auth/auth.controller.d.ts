import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<any>;
    register(user: CreateUserDto): Promise<any>;
}
