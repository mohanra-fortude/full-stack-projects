import { ApiProperty } from "@nestjs/swagger";
export class CreateIddocDto {
    @ApiProperty()
    documentName:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    userId:any;
}
