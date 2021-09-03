import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    registerUser(userDto: CreateUserDto): Promise<import("./entities/user.entity").UserEntity>;
    private validateUser;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
        expiresIn: number;
    }>;
}
