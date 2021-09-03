import { PartialType } from '@nestjs/swagger';
import { CreateIddocDto } from './create-iddoc.dto';

export class UpdateIddocDto extends PartialType(CreateIddocDto) {}
