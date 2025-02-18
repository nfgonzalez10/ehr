import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KeyReferenceService } from './key-reference.service';
import { CreateKeyReferenceDto } from './dto/create-key-reference.dto';
import { UpdateKeyReferenceDto } from './dto/update-key-reference.dto';
import { keyReferenceList } from './key-reference.constants';

@Controller('key-reference')
export class KeyReferenceController {
  constructor(private readonly keyReferenceService: KeyReferenceService) {}

  @Post()
  create(@Body() createKeyReferenceDto: CreateKeyReferenceDto) {
    console.log(createKeyReferenceDto);
    return this.keyReferenceService.create(createKeyReferenceDto);
  }

  @Post('bulk')
  createBulk() {
    return this.keyReferenceService.createBulk(keyReferenceList);
  }

  @Get()
  findAll() {
    return this.keyReferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyReferenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeyReferenceDto: UpdateKeyReferenceDto,
  ) {
    return this.keyReferenceService.update(+id, updateKeyReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyReferenceService.remove(+id);
  }
}
