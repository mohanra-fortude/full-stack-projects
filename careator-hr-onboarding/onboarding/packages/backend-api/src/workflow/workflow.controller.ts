import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { WorkflowService } from "./workflow.service";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateWorkflowDto } from "./dto/update-workflow.dto";
import { UserroleService } from "src/userrole/userrole.service";
import { ApiTags } from "@nestjs/swagger";
import { Workflow } from "./entities/workflow.entity";

@ApiTags("Workflow")
@Controller("workflow")
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}
  @Get("pagination")
  findAll(@Query("page") page: number = 1, @Query("size") size: number = 2) {
    return this.workflowService.findAll(page, size);
  }

  @Get("work")
  findByQueryAndSort(
    @Query("query") query: string = "",
    @Query("firstName") field: string,
    @Query("order") order: string,
    @Query("status") status: string = ""
  ) {
    return this.workflowService.findByQueryAndSort(query, field, order, status);
  }

  @Get("workflow-by-userId/:userId")
  findWorkflowByUserId(@Param("userId") userId: string) {
    return this.workflowService.getWorkflowDetailsByUserId(userId);
  }

  //getting workflow by id
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.workflowService.findOne(+id);
  }

  @Post("sendmail-and-capture-in-notification-and-workflow-tables")
  sendMail(@Body() dataAboutMailWorkflowAndNotification: any) {
    return this.workflowService.sendMailAndCaptureInNotificationAndWorkflowTables(
      dataAboutMailWorkflowAndNotification
    );
  }

  @Post()
  create(@Body() createRow: Workflow) {
    return this.workflowService.createRow(createRow);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.workflowService.remove(+id);
  }
}
