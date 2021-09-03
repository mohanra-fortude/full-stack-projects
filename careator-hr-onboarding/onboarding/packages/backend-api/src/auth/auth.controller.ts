import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { ChangeTokenDto } from "./dto/changeTokenDto";
import { CreateUserDto } from "./dto/create-user.dto";
import { ForgotDto } from "./dto/forgot.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user/user.service";
import {
  UploadImageInLocalInterceptor,
  UploadImageInAWSInterceptor,
} from "./../uploadfile";
import { JwtAuthGuard } from "./jwt.guard";
import * as AWS from "aws-sdk";
import { FileInterceptor } from "@nestjs/platform-express";
import { profile_pic } from "./../file-path-constants";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("login")
  @HttpCode(200)
  @ApiOkResponse({ description: "Login Successful" })
  @ApiBadRequestResponse({
    description: "User does not exists or invalid login details",
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiNotFoundResponse({ description: "No data is Found...  😿" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findById(id);
  }

  @ApiNotFoundResponse({ description: "No data is Found...  😿" })
  @Get("mobile/:mob")
  findAll(@Param("mob") mob: string) {
    return this.userService.findMob(mob);
  }

  @ApiNotFoundResponse({ description: "No data is Found...  😿" })
  @Get("email/:mail")
  findByEmail(@Param("mail") mail: string) {
    return this.userService.findByEmail(mail);
  }

  @Get("firstTimeLogin/:id")
  firstTimeLogin(@Param("id") id: string) {
    return this.userService.firstTimeLogin(id);
  }

  @Get("profile-image-from-local/:fileName")
  async getProfileImageFromLocal(
    @Param("fileName") fileName: string,
    @Res() res: any
  ): Promise<any> {
    return res.sendFile(fileName, {
      root: `${profile_pic.PROFILE_IMAGE_PATH}`,
    });
  }

  @Get("profile-image-from-aws/:fileName")
  async getProfileImageFromAWS(
    @Param("fileName") fileName: string,
    @Res() res: any
  ): Promise<any> {
    const awsFileKey = `profile-image/${fileName}`;
    const s3 = new AWS.S3();
    const bucketParams = {
      Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
      Key: awsFileKey,
    };
    s3.getObject(bucketParams, function (err, data) {
      if (err) {
        return res.json({
          success: false,
          error: err,
        });
      } else {
        res.attachment(awsFileKey);
        s3.getObject(bucketParams).createReadStream().pipe(res);
      }
    });
  }

  @UseInterceptors(UploadImageInLocalInterceptor)
  @Post("upload-profile-image-to-local/:userid")
  async uploadProfileImageFileInLocal(
    @Param("userid") userid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.updateProfilePicInLocal(userid, file);
  }

  @UseInterceptors(UploadImageInAWSInterceptor)
  @Post("upload-profile-image-to-aws/:userid")
  async uploadProfileImageFileInAWS(
    @Param("userid") userid: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.updateProfilePicInAWS(userid, file);
  }

  @Put("forgot/:id")
  changePassword(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updatePassword(id, updateUserDto);
  }

  @Patch("lastLogin/:id")
  changeLastLogin(@Param("id") id: string) {
    return this.userService.updateLastlogin(id);
  }

  @Patch("passChanged/:userId")
  passChanged(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.passChanged(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("register")
  @ApiCreatedResponse({ description: "New user account created" })
  @ApiBadRequestResponse({
    description: "User already exists or server error",
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Patch("register")
  update(@Body() updateUserDto: CreateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("employee_userrole")
  test(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUserRoleEmployee(createUserDto);
  }

  @Post("forgot")
  @HttpCode(200)
  @ApiOkResponse({ description: "Check your Email and Reset Password" })
  @ApiBadRequestResponse({
    description: "User does not exists or invalid Eamil details",
  })
  forgotPassword(@Body() forgotDto: ForgotDto) {
    return this.authService.forgotPassword(forgotDto);
  }

  @Patch("changepassword")
  passwordChange(@Body() changepasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changepasswordDto);
  }

  @Patch("updateToken/:userId")
  updateToken(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateToken(userId, updateUserDto.userToken);
  }
  @Get("gcByuserId/:userId")
  findCandidateDetails(@Param("userId") userId: string) {
    return this.userService.getNameByEuserId(userId);
  }
  @Get("NameByuserId/:userId")
  findCandidateName(@Param("userId") userId: string) {
    return this.userService.getNameByCuserId(userId);
  }
  @Get("notification/:email")
  getNotifiByCuserId(@Param("email") email: string) {
    return this.userService.getNotifiByCuserId(email);
  }
}
