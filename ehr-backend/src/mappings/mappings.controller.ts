import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MappingsService } from './mappings.service';
import { CreateMappingDto } from './dto/create-mapping.dto';
import { UpdateMappingDto } from './dto/update-mapping.dto';

@Controller('tenants/:tenantId/mappings')
export class MappingsController {
  constructor(private readonly mappingsService: MappingsService) {}

  @Post()
  create(
    @Param('tenantId') tenantId: string,
    @Body() createMappingDto: CreateMappingDto,
  ) {
    createMappingDto.tenantId = parseInt(tenantId);
    if (!createMappingDto.tenantId) {
      throw new Error('Tenant ID is required');
    }

    return this.mappingsService.create(createMappingDto);
  }

  @Get()
  findAll(@Param('tenantId') tenantId: string) {
    return this.mappingsService.findAll(+tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mappingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMappingDto: UpdateMappingDto) {
    return this.mappingsService.update(+id, updateMappingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mappingsService.remove(+id);
  }
}
