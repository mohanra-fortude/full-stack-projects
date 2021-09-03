import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { SkipThrottle } from "@nestjs/throttler";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Job")
@Controller("job")
export class JobController {
  clientService: any;
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get("findByClientId")
  findJobsByClientId(@Query("cid") id: number) {
    return this.jobService.findJobsByClientId(id);
  }

  @Get("findJobsByClientIdAndJobName")
  findJobsByClientIdAndJobName(
    @Query("cid") id: number,
    @Query("jcode") jobcode: string
  ) {
    return this.jobService.findJobsByClientIdAndJobName(id, jobcode);
  }

  @Get("findJobsByJobName")
  findJobsByJobName(@Query("jcode") jobcode: string) {
    return this.jobService.findJobsByJobName(jobcode);
  }

  @Get()
  findAll() {
    const jobget = this.jobService.findAll();

    return jobget;
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.jobService.findOne(+id);
  }

  @Patch(":id")
  update(@Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(updateJobDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobService.remove(+id);
  }

  @Patch("deActivation/:id")
  updateActivation(@Param("id") id: number, @Body() data: any) {
    return this.jobService.updateActivation(id, data);
  }
}
