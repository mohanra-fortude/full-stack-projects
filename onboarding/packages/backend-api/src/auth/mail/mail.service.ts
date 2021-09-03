import { ForgotDto } from "./../dto/forgot.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Asset } from "src/asset/entities/asset.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async passwordReset(
    user: ForgotDto,
    token: string,
    userId: any,
    subject: any,
    host1: any
  ) {
    const id = userId;
    const url = `${host1}/${id}/${token}`;
    await this.mailerService.sendMail({
      to: user.email,

      subject: subject,
      template: "./confirmation",

      context: {
        name: user.email,
        url,
      },
    });
  }

  async sendEmail(sendTo: string, temp: string, data: any = {}, subject: any) {
    await this.mailerService.sendMail({
      to: sendTo,
      subject: subject,
      template: `./${temp}`,

      context: {
        emailData: data,
      },
    });
  }

  async sendEmailOffer(
    sendTo: string,
    temp: string,
    subject: any,
    mailData: any = {},
    userId1: any
  ) {
    console.log("data........." + userId1, mailData);
    await this.mailerService.sendMail({
      to: sendTo,
      subject: subject,
      template: `./${temp}`,

      context: {
        emailData: mailData,
      },
    });
  }

  async sendEmailOfferToCandidate(
    sendTo: string,
    temp: string,
    data: any = {},
    subject: any,
    fileName: any,
    userId: any
  ) {
    await this.mailerService.sendMail({
      to: sendTo,
      subject: subject,
      template: `./${temp}`,
      context: {
        emailData: data,
      },
      attachments: [
        {
          filename: fileName,
          path: `http://localhost:8080/api/document/doc-file-from-aws/${userId}/${fileName}`,
        },
      ],
    });
  }

  async sendEmail1(
    sendTo: string,
    temp: string,
    subject: any,
    cc: any,
    data: any = { remark: "" }
  ) {
    await this.mailerService.sendMail({
      to: sendTo,
      cc: cc,
      subject: subject,
      template: `./${temp}`,
      context: {
        emailData: data,
      },
    });
  }

  async sendAssetEmailToAdmin(AssetData: any, CandData: any) {
    try {
      console.log("AssetData--", AssetData);
      console.log("CandData--", CandData);
      await this.mailerService.sendMail({
        to: `naveen.rh.2+admin@gmail.com`,
        subject: `Asset Details of ${CandData.firstName}`,
        template: `./AssetToAdmin`,
        context: {
          assetData: AssetData,
          candidateData: CandData,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
