import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyReferenceDto } from './create-key-reference.dto';

export class UpdateKeyReferenceDto extends PartialType(CreateKeyReferenceDto) {}
