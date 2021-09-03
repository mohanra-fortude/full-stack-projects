import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
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
import { mailSubject } from "src/mailsubject-constants";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { getRepositoryToken } from "@nestjs/typeorm";

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    count: jest.fn((entity) => entity),
}));

const loginDtorequest: any = {
    email: "abc@careator.com",
    password: "12345",
    passwordHash:
        "$2b$10$QNPiKoY7w3tlqP2LoNMsKec2tdsV1TGVuQYuR3jai6F7Pbk26HbN2",
};

const loginResponse: any = {
    message: "Login successful",
    access_token: "access-token-1234",
    userId: "uuid-1234",
    userEmail: "abc@careator.com",
    expiresIn: 3600,
};

const createUserDtorequest: CreateUserDto = {
    mobile: "999999999",
    homePhone: "2222222",
    email: "abc@careator.com",
    passwordHash: "12345-hash",
    firstName: "ramana",
    lastName: "cv",
    roleId: 123,
    designation: "developer",
    status: "active",
    orgId: 1,
};
const createUserResponse: any = {
    userId: "uuid-1234",
    mobile: "999999999",
    homePhone: "2222222",
    email: "abc@careator.com",
    passwordHash: "12345-hash",
    firstName: "ramana",
    lastName: "cv",
    roleId: 123,
    designation: "developer",
    status: "active",
};

const forgotDtorequest: ForgotDto = {
    email: "abc@careator.com",
    userToken: "uuid-token",
};

const forgotPasswordResponse: any = {
    message: "Please Check your Eamil and Reset Your Password",
    access_token: "uuid-token",
    expiresIn: 360,
    confiMail: "abc@careator.com",
    userId: "uuid-1234",
};
const changepasswdDtorequest: any = {
    oldPassword: "password",
    passwordHash:
        "$2b$10$QNPiKoY7w3tlqP2LoNMsKec2tdsV1TGVuQYuR3jai6F7Pbk26HbN2",
    newPassword: "12345",
    userId: "uuid-1234",
};
const notificationRepo: any = {
    fromEmail: "abc@careator.com",
    toEmail: "mohankesappa@gmail.com",
    userId: "uuid-1234",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "admin",
    updatedBy: "admin",
};
const changePasswordResponse: any = {
    userId: "uuid-1234",
    passwordHash: "12345-hash",
};
const updatetoken: any = {
    userId: "uuid-1234",
    userToken: "uuid-token",
};
export const userServicemock = {
    passwordReset: jest.fn(),
    sendEmail: jest.fn(),
    findByEmail: jest.fn((email) => {
        return {
            userId: "uuid-1234",
            passwordHash:
                "$2b$10$QNPiKoY7w3tlqP2LoNMsKec2tdsV1TGVuQYuR3jai6F7Pbk26HbN2",
            email: "abc@careator.com",
        };
    }),
    findById: jest.fn(),
    create: jest.fn((dto) => {
        return {
            userId: "uuid-1234",
            ...dto,
        };
    }),

    update: jest.fn((dto) => {
        return {
            userId: "uuid-1234",
            ...dto,
        };
    }),
    updateToken: jest.fn((userId, token) => {
        return {
            userId: "uuid-1234",
            userToken: "access-token-1234",
        };
    }),
    createUserCandidate: jest.fn(),
    updateCandidateByRecruiter: jest.fn(),
};

export const mailServicemock = {
    passwordReset: jest.fn(),
    sendEmail: jest.fn(),
};

export const jwtServicemock = {
    sign: jest.fn((data) => "access-token-1234"),
};

describe("AuthService", () => {
    let service: AuthService;
    let userRepositoryMock: MockType<Repository<UserEntity>>;
    let notificationRepositoryMock: MockType<Repository<Notification>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: getRepositoryToken(Notification),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: UserService,
                    useValue: userServicemock,
                },
                {
                    provide: JwtService,
                    useValue: jwtServicemock,
                },
                {
                    provide: MailService,
                    useValue: mailServicemock,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userRepositoryMock = module.get(getRepositoryToken(UserEntity));
        notificationRepositoryMock = module.get(
            getRepositoryToken(Notification)
        );
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    //Validate User Exist
    it("should register and create a new user", async () => {
        expect(await service.registerUser(createUserDtorequest)).toEqual(
            createUserResponse
        );
        expect(await userServicemock.create).toHaveBeenCalled();
        expect(await userServicemock.create).toHaveBeenCalledWith(
            createUserDtorequest
        );
    });

    it("should allow a user to login", async () => {
        userRepositoryMock.save.mockReturnValue(loginResponse);
        expect(await service.login(loginDtorequest)).toEqual(loginResponse);
    });

    it("should allow a logged in user to change password ", async () => {
        let password = 12345;
        let passwordHash =
            "$2b$10$QNPiKoY7w3tlqP2LoNMsKec2tdsV1TGVuQYuR3jai6F7Pbk26HbN2";
        let spayCompare = jest
            .spyOn(bcrypt, "compare")
            .mockResolvedValue(changePasswordResponse);
        userRepositoryMock.count.mockReturnValue(false);
        userRepositoryMock.save.mockReturnValue(changepasswdDtorequest);
        expect(await userServicemock.findById(changepasswdDtorequest.userId));
        expect(await userServicemock.findById).toBeCalled();
        expect(await userServicemock.findById).toBeCalledWith(
            changepasswdDtorequest.userId
        );
        //expect(await spayCompare).toHaveBeenCalled();
        expect(await spayCompare).toHaveBeenCalledWith(password, passwordHash);
        expect(await service.changePassword(changepasswdDtorequest)).toEqual(
            changePasswordResponse
        );
    });

    it("should allow a user who forgot password to reset password ", async () => {
        userRepositoryMock.count.mockReturnValue(false);
        userRepositoryMock.save.mockReturnValue(createUserResponse);
        const notification =
            notificationRepositoryMock.create(notificationRepo);
        expect(await service.validatePassword(forgotDtorequest)).toBe(
            forgotDtorequest
        );

        expect(await mailServicemock.passwordReset).toBeCalled();
        expect(await mailServicemock.passwordReset).toBeCalledWith();
        notificationRepositoryMock.save.mockReturnValue(notification);
        expect(
            await service.updateToken(updatetoken.userId, updatetoken.userToken)
        );
        expect(await service.forgotPassword(forgotPasswordResponse)).toEqual(
            forgotPasswordResponse
        );
    });
});
