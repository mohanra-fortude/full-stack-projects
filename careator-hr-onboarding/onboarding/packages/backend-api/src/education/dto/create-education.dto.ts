import { ApiProperty } from "@nestjs/swagger";

export class CreateEducationDto {
    @ApiProperty()
    institute: string;

    @ApiProperty()
    startDate: string;

    @ApiProperty()
    completionDate: string;

    @ApiProperty()
    degree: string;

    @ApiProperty()
    grade: string;

    @ApiProperty()
    subjects: string;
}
