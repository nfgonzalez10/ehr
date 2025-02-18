import { Inject, Injectable } from '@nestjs/common';
import { CreateEhrDto } from './dto/create-ehr.dto';
import { MappingsService } from 'src/mappings/mappings.service';
import { EhrDataSenderPort } from 'src/ports/ehr-data-sender-port.interface';

@Injectable()
export class EhrsService {
  constructor(
    @Inject(MappingsService)
    private readonly mappingsService: MappingsService,
    @Inject(EhrDataSenderPort)
    private readonly ehrDataSender: EhrDataSenderPort,
  ) {}
  async create(createEhrDto: CreateEhrDto, tenantId: number) {
    const { mapResult } = await this.mappingsService.findAll(+tenantId);
    const dictionay: { [key: string]: string } = mapResult.reduce(
      (accumulator, { referenceKeyName, parameterName }) => {
        accumulator[referenceKeyName] = parameterName;
        return accumulator;
      },
      {},
    );
    const ehr = Object.keys(createEhrDto.data).reduce((accumulator, key) => {
      const newKey = dictionay[key];
      if (!newKey) return accumulator;
      accumulator[newKey] = createEhrDto.data[key];
      return accumulator;
    }, {});

    const mockResponse = await this.ehrDataSender.sendEhrData(ehr);
    console.log(mockResponse);
    return ehr;
  }
}
