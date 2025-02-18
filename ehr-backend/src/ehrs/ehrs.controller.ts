import { Controller, Post, Body, Param } from '@nestjs/common';
import { EhrsService } from './ehrs.service';
import { CreateEhrDto } from './dto/create-ehr.dto';

@Controller('ehrs')
export class EhrsController {
  constructor(private readonly ehrsService: EhrsService) {}

  @Post('/tenants/:tenantId')
  create(
    @Param('tenantId') tenantId: string,
    @Body() createEhrDto: CreateEhrDto,
  ) {
    return this.ehrsService.create(createEhrDto, +tenantId);
  }
}
