import { Workflow } from "./../../workflow/entities/workflow.entity";
import { Notification } from "./../../notification/entities/notification.entity";
import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRole } from "../../userrole/entities/userrole.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { Role } from "../../role/entities/role.entity";
import { UserroleService } from "../../userrole/userrole.service";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "../mail/mail.service";
import { Candidate } from "../../candidate/entities/candidate.entity";
import { CreateCandidateDto } from "../../candidate/dto/create-candidate.dto";
import { UpdateCandidateDto } from "../../candidate/dto/update-candidate.dto";
import { mailSubject } from "../../mailsubject-constants";
import { FilesService } from "../../files/files.service";
import uploadFileInAWS from "../../document/aws.service";
import { workflowconstant } from "src/workflow-constants";

@Injectable()
export class UserService {
  // CRUD BEHAVIOR OF USER ENTITY
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(UserRole) private userRole: Repository<UserRole>,
    @InjectRepository(Employee) private employee: Repository<Employee>,
    @InjectRepository(Candidate)
    private candidateRepo: Repository<Candidate>,
    @InjectRepository(Notification)
    private notifiRepo: Repository<Notification>,
    @InjectRepository(Workflow) private workflowRepo: Repository<Workflow>,
    @InjectRepository(Role) private role: Repository<Role>,
    private userroleService: UserroleService,
    private mailService: MailService,
    private readonly filesService: FilesService
  ) {}

  randomUser;
  randomUserId = () => {
    const randomId = uuidv4();
    this.randomUser = randomId;
    return randomId;
  };

  async getNotifiByCuserId(email: string) {
    const getNotifiByCuserId = await getConnection()
      .createQueryBuilder()
      .select([
        "c.firstName as firstName",
        "c.lastName as lastName",

        "e.firstName as firstName",
        "e.lastName as lastName",

        "n.subject as subject",
        "n.updatedAt as updatedAt",
        "n.userId as userId",
        "n.id as id",
        "u.userId as userId",
      ])
      .from(UserEntity, "u")
      .leftJoin(Candidate, "c", "u.userId = c.userId")
      .leftJoin(Employee, "e", "u.userId = e.userId")
      .leftJoin(Notification, "n", "u.userId = n.userId")
      .where("n.toEmail=:toEmail", { toEmail: email })
      .andWhere("n.unRead= 0")
      .orderBy("updatedAt", "DESC")
      .getRawMany();
    return getNotifiByCuserId;
  }
  async firstTimeLogin(userId: string) {
    const firstTimeLogin = await getConnection()
      .createQueryBuilder()
      .select(["u.userId as userId", "u.firstTimeLogin as firstTimeLogin"])
      .from(UserEntity, "u")
      .where("u.userId=:userId", { userId: userId })
      .getRawOne();
    return firstTimeLogin;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email } });
  }

  async findById(id: string) {
    return this.userRepo.findOne({
      where: { userId: id },
    });
  }

  async findMob(mob: string) {
    return this.userRepo.findOne({ where: { mobile: mob } });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async updatePassword(userId: string, updateUserDto: UpdateUserDto) {
    const password = await this.hashPassword(updateUserDto.password);
    return this.userRepo.update(
      { userId: userId },
      {
        passwordHash: password,
      }
    );
  }

  async deleteUser(id: string, updateUserDto: any) {
    return this.userRepo.update(
      { userId: id },
      {
        isActive: updateUserDto.isActive,
      }
    );
  }

  async deleteJob(id: string, updateUserDto: any) {
    return this.userRepo.update(
      { userId: id },
      {
        isActive: updateUserDto.isActive,
      }
    );
  }

  async create(userDto: CreateUserDto) {
    const { email, mobile } = userDto;
    const isUserAvailable = await this.findByEmail(email);
    if (isUserAvailable) {
      throw new HttpException({ message: "User already exists" }, 400);
    }

    this.randomUserId();
    const organization: any = 1;
    const user = this.userRepo.create({
      userId: this.randomUser,
      email: email,
      mobile: mobile,
      passwordHash: "12345",
      orgId: organization,
      lastLogin: "",
      createdBy: "admin",
      updatedBy: "admin",
    });

    const saving = async () => {
      const data = await this.userRepo.save(user);
      await this.createUserRoleEmployee(userDto);
    };
    return saving();
  }

  createUserRoleEmployee = async (userDto: CreateUserDto) => {
    const {
      email,
      mobile,
      roleId,
      managerId,
      designation,
      firstName,
      lastName,
      homePhone,
      status,
    } = userDto;

    const data = await this.findByEmail(email);
    const roledata = await this.userroleService.findOneRole(roleId);

    const userRole = () =>
      this.userRole.create({
        userId: this.randomUser,
        roleId: roledata,
      });

    const employee = () =>
      this.employee.create({
        userId: this.randomUser,
        firstName: firstName,
        lastName: lastName,
        homePhone: homePhone,
        managerId: managerId,
        designation: designation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin",
        updatedBy: "admin",
      });

    const notifiRepo = () =>
      this.notifiRepo.create({
        fromEmail: mailSubject.fromEmail,
        toEmail: email,
        subject: `${status} created employee ${firstName} ${lastName}`,

        userId: this.randomUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: managerId,
        updatedBy: managerId,
      });
    const workflowRepo = () =>
      this.workflowRepo.create({
        description: `${status} created employee ${firstName} ${lastName}`,
        userId: this.randomUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: managerId,
        updatedBy: managerId,
      });

    return (
      this.userRole.save(userRole()),
      this.employee.save(employee()),
      this.notifiRepo.save(notifiRepo()),
      this.workflowRepo.save(workflowRepo())
    );
  };

  async update(userUpdateDto: any) {
    const {
      userId,
      email,
      firstName,
      lastName,
      managerId,
      designation,
      mobile,
      homePhone,
      roleId,
    } = userUpdateDto;

    const user = {
      email: email,
      mobile: mobile,
      updatedAt: new Date().toISOString(),
      updatedBy: "admin",
    };

    const userRole = {
      roleId: roleId,
    };

    const employee = {
      firstName: firstName,
      lastName: lastName,
      homePhone: homePhone,
      managerId: managerId,
      designation: designation,
      updatedAt: new Date().toISOString(),
      updatedBy: "admin",
    };

    return (
      this.userRepo.update({ userId: userId }, user),
      this.userRole.update({ userId: userId }, userRole),
      this.employee.update({ userId: userId }, employee)
    );
  }

  async createUserCandidate(createCandidateDto: CreateCandidateDto) {
    this.randomUserId();
    const {
      fname,
      lname,
      email,
      mobile,
      jobId,
      roleId,
      statusCode,
      recruiterId,
      userId,
      status,
    } = createCandidateDto;
    const user = this.userRepo.create({
      userId: this.randomUser,
      email: email,
      mobile: mobile,
      passwordHash: "12345",
      createdBy: recruiterId,
      updatedBy: recruiterId,
    });
    await this.userRepo.save(user);

    const candUserRole = this.userRole.create({
      userId: this.randomUser,
      roleId: roleId,
    });

    const candidate = this.candidateRepo.create({
      firstName: fname,
      lastName: lname,
      job: jobId,
      userId: this.randomUser,
      createdBy: "recruiter",
      updatedBy: "recruiter",
      user: recruiterId,
      status: statusCode,
    });
    await this.candidateRepo.save(candidate);

    const mailData = {
      email: email,
      firstName: fname,
      lastName: lname,
    };

    const mail = this.mailService.sendEmail(
      email,
      "UserCreated",
      mailData,
      mailSubject.profileCreated
    );
    mail
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const notification = this.notifiRepo.create({
      fromEmail: mailSubject.fromEmail,
      toEmail: email,
      subject: `${status} created candidate ${fname} ${lname}`,
      userId: this.randomUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: recruiterId,
      updatedBy: recruiterId,
    });
    const workflowRepo = this.workflowRepo.create({
      description: `${status} created candidate ${fname} ${lname}`,
      userId: this.randomUser,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: recruiterId,
      updatedBy: recruiterId,
    });
    await this.notifiRepo.save(notification);
    await this.workflowRepo.save(workflowRepo);
    await this.userRole.save(candUserRole);
  }

  async updateCandidateByRecruiter(
    id: any,
    updateCandidateDto: UpdateCandidateDto
  ) {
    const { email, fname, lname, mobile } = updateCandidateDto;

    const user = {
      email: email,
      mobile: mobile,
      updatedAt: new Date().toISOString(),
      updatedBy: "recruiter",
    };

    const candidate = {
      firstName: fname,
      lastName: lname,
      // job: jobId,
      updatedAt: new Date().toISOString(),
      updatedBy: "recruiter",
    };
    return (
      this.userRepo.update({ userId: id }, user),
      this.candidateRepo.update({ userId: id }, candidate)
    );
  }
  async passChanged(userId: string, updateUserDto: UpdateUserDto) {
    const { firstTimeLogin } = updateUserDto;

    return this.userRepo.update(
      { userId: userId },
      {
        firstTimeLogin: firstTimeLogin,
      }
    );
  }

  async updateProfilePicInLocal(userid: string, file: Express.Multer.File) {
    try {
      const updatedUserProfile = await this.userRepo.update(
        { userId: userid },
        {
          profilePicture: file.filename,
        }
      );
      const profileInfo = {
        filename: file.filename,
      };

      return profileInfo;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfilePicInAWS(usrId: string, file: Express.Multer.File) {
    try {
      const { awsFilePath, awsFileName } = await uploadFileInAWS(
        file,
        usrId,
        "profile"
      );
      const updatedUserProfile = await this.userRepo.update(
        { userId: usrId },
        {
          profilePicture: awsFileName,
        }
      );
      const profileInfo = {
        filename: awsFileName,
      };

      return profileInfo;
    } catch (error) {
      console.log(error);
    }
  }

  async updateLastlogin(userId: string) {
    return this.userRepo.update(
      { userId: userId },
      {
        lastLogin: new Date(),
      }
    );
  }

  async getNameByEuserId(userId: string) {
    const getNameByEuserId = await getConnection()
      .createQueryBuilder()
      .select(["e.firstName as firstName", "e.lastName as lastName"])
      .from(Employee, "e")
      .where("e.userId=:userId", { userId: userId })
      .getRawOne();

    return getNameByEuserId;
  }
  async getNameByCuserId(userId: string) {
    const getNameByCuserId = await getConnection()
      .createQueryBuilder()
      .select(["c.firstName as firstName", "c.lastName as lastName"])
      .from(Candidate, "c")
      .where("c.userId=:userId", { userId: userId })
      .getRawOne();

    return getNameByCuserId;
  }
}
function user(user: any, arg1: string) {
  throw new Error("Function not implemented.");
}
