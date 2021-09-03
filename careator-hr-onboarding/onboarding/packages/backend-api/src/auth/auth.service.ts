import { Notification } from "./../notification/entities/notification.entity";
import { HttpException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import constants from "./constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { ForgotDto } from "./dto/forgot.dto";
import { MailService } from "./mail/mail.service";
import { UserEntity } from "./entities/user.entity";
import { UserRole } from "src/userrole/entities/userrole.entity";
import { v4 as uuidv4 } from "uuid";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { mailSubject } from "../mailsubject-constants";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ChangeTokenDto } from "./dto/changeTokenDto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(Notification)
    private notifiRepo: Repository<Notification>,
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}
  randamToken = uuidv4();

  private async validateUser(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException({ message: "User not found" }, 404);
      }
      console.log(user)
      if(user.isActive === false){
        throw new HttpException({ message: "User Account Deleted" }, 400);

      }
      const isVerified = await bcrypt.compare(password, user.passwordHash);
      if (!isVerified) {
        throw new HttpException({ message: "Invalid login details" }, 401);
      }
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async validatePassword(forgotDto: ForgotDto) {
    try {
      const { email } = forgotDto;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new HttpException({ message: "Email not found" }, 400);
      }
      const isAlredyUser = await this.userService.findByEmail(email);
      if (!isAlredyUser) {
        throw new HttpException({ message: "Invalid Email details" }, 400);
      }
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async login(loginDto: LoginDto) {
    return this.validateUser(loginDto).then((user) => {
      const payload = { sub: user.userId, id: user.userId };
      const token = this.jwtService.sign(payload);
      return Promise.resolve({
        message: "Login successful",
        access_token: token,
        userId: user.userId,
        userEmail: user.email,

        expiresIn: constants.EXPIRATION_TIME * 60,
      });
    });
  }

  async forgotPassword(forgotDto: ForgotDto) {
    return this.validatePassword(forgotDto).then((user: any) => {
      const token = this.randamToken;

      const mail = this.mailService.passwordReset(
        forgotDto,
        token,
        user.userId,
        mailSubject.forgotPassword,
        forgotDto.host1
      );

      const notification = this.notifiRepo.create({
        fromEmail: mailSubject.fromEmail,
        toEmail: user.email,
        subject: mailSubject.forgotPassword,
        userId: user.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin",
        updatedBy: "admin",
      });
      this.notifiRepo.save(notification);
      this.updateToken(user.userId, token);
      return Promise.resolve({
        message: "Please Check your Eamil and Reset Your Password",
        access_token: token,
        expiresIn: constants.EXPIRATION_TIME * 60,
        confiMail: mail,
        userId: user.userId,
      });
    });
  }

  registerUser(userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async changePassword(changePassword: ChangePasswordDto) {
    const { userId, oldPassword, newPassword } = changePassword;
    const user = await this.userService.findById(userId);
    const isVerified = await bcrypt.compare(oldPassword, user.passwordHash);
    const hashNewPassword = await this.hashPassword(newPassword);
    if (!isVerified) {
      throw new HttpException({ message: "Unauthorized" }, 401);
      //  message: "password not chnaged"
    }
    return this.userRepo.update(
      { userId: userId },
      { passwordHash: hashNewPassword }
    );
  }

  async updateToken(userId: string, userToken: string) {
    return this.userRepo.update(
      { userId: userId },
      {
        userToken: userToken,
      }
    );
  }
}
