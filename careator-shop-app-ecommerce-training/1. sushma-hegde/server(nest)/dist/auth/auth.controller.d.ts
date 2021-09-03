import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
        expiresIn: number;
    }>;
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    getProfile(req: any): Promise<import("./entities/user.entity").UserEntity>;
}
