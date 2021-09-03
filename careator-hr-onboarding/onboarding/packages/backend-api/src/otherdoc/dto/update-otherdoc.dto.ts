import { PartialType } from '@nestjs/mapped-types';
import { CreateOtherdocDto } from './create-otherdoc.dto';

export class UpdateOtherdocDto extends PartialType(CreateOtherdocDto) {}
