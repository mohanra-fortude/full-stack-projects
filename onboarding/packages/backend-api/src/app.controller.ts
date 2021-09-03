import { MailerService } from "@nestjs-modules/mailer";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { MailService } from "./auth/mail/mail.service";

@Controller()
export class AppController {
  // create an object of appservice class & inject in the appcontroller class
  constructor(
    private readonly appService: AppService,
    private mailerService: MailService
  ) {}

  @Get()
  getWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @Post("sendmail")
  sendMail(@Body() mailerData: any) {
    const { sendTo, temp, data, subject } = mailerData;
    return this.mailerService.sendEmail(sendTo, temp, data, subject);
  }

  @Post("sendmailwithcc")
  sendMail1(@Body() mailerData: any) {
    const { sendTo, temp, subject, cc, data } = mailerData;
    return this.mailerService.sendEmail1(sendTo, temp, subject, cc, data);
  }
}
