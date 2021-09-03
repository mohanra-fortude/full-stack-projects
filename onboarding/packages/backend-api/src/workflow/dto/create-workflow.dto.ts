import {ApiProperty} from "@nestjs/swagger";

export class CreateWorkflowDto {
    @ApiProperty()
    id:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    userId:any;
}
