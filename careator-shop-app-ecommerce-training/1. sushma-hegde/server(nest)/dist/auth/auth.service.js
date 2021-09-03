"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    registerUser(userDto) {
        return this.userService.create(userDto);
    }
    async validateUser(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.userService.findByEmail(email);
            if (!user) {
                throw new common_1.HttpException({ message: "User not found" }, 400);
            }
            const isVerified = await bcrypt.compare(password, user.userPassword);
            if (!isVerified) {
                throw new common_1.HttpException({ message: "Invalid login details" }, 400);
            }
            return Promise.resolve(user);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async login(loginDto) {
        return this.validateUser(loginDto).then((user) => {
            const payload = { sub: user.userId, email: user.userEmail };
            const token = this.jwtService.sign(payload);
            return Promise.resolve({
                message: "Login successful",
                access_token: token,
                expiresIn: constants_1.default.EXPIRATION_TIME * 60,
            });
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map